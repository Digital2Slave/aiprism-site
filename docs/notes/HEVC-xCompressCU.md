# HEVC-xCompressCU

本文的学习离不开各路大神的帮助，这里主要谢谢[](http://my.csdn.net/HEVC_CJL)[hevc_cjl](http://my.csdn.net/hevc_cjl)和[yangxiao_xiang](http://my.csdn.net/yangxiao_xiang)喽~~~


```
    // ====================================================================================================================
    // Protected member functions
    // ====================================================================================================================
    /** Compress a CU block recursively with enabling sub-LCU-level delta QP
     *\param   rpcBestCU
     *\param   rpcTempCU
     *\param   uiDepth
     *\returns Void
     *
     *- for loop of QP value to compress the current CU with all possible QP
    */
    #if AMP_ENC_SPEEDUP
    Void TEncCu::xCompressCU( TComDataCU*& rpcBestCU, TComDataCU*& rpcTempCU, UInt uiDepth, PartSize eParentPartSize )
    #else
    Void TEncCu::xCompressCU( TComDataCU*& rpcBestCU, TComDataCU*& rpcTempCU, UInt uiDepth )
    #endif
    {
      TComPic* pcPic = rpcBestCU->getPic();

      // get Original YUV data from picture
      //getZorderIdxInCU():CU中的Z扫描绝对地址；getAddr():CU在slice中的地址；getPicYuvOrg():输入YUV的纹理信息
      m_ppcOrigYuv[uiDepth]->copyFromPicYuv( pcPic->getPicYuvOrg(), rpcBestCU->getAddr(), rpcBestCU->getZorderIdxInCU() );

      // variables for fast encoder decision
      Bool    bEarlySkip  = false;
      Bool    bTrySplit   = true;
      Double  fRD_Skip    = MAX_DOUBLE;

      // variable for Early CU determination
      Bool    bSubBranch = true;

      // variable for Cbf fast mode PU decision---Cbf: coded block flags
      Bool    doNotBlockPu        = true;
      Bool earlyDetectionSkipMode = false;

      Bool    bTrySplitDQP  = true;

      static  Double  afCost[ MAX_CU_DEPTH ];//MAX_CU_DEPTH为7 即128以2为底的对数，其中128为最大的LCU，即TCU
      static  Int      aiNum[ MAX_CU_DEPTH ];

      if ( rpcBestCU->getAddr() == 0 )
      {
        ::memset( afCost, 0, sizeof( afCost ) );
        ::memset( aiNum,  0, sizeof( aiNum  ) );
      }//memset：作用是在一段内存块中填充某个给定的值，它是对较大的结构体或数组进行清零操作的一种最快方法

      Bool bBoundary = false;
      UInt uiLPelX   = rpcBestCU->getCUPelX();//CU内部左边界
      UInt uiRPelX   = uiLPelX + rpcBestCU->getWidth(0)  - 1;//CU内部右边界
      UInt uiTPelY   = rpcBestCU->getCUPelY();//CU内部上边界
      UInt uiBPelY   = uiTPelY + rpcBestCU->getHeight(0) - 1;//CU内部下边界

      Int iBaseQP = xComputeQP( rpcBestCU, uiDepth );//配置文件(.cfg)中设置的QP值32.可以设置范围为0-51
      Int iMinQP;
      Int iMaxQP;
      Bool isAddLowestQP = false;
      Int lowestQP = -rpcTempCU->getSlice()->getSPS()->getQpBDOffsetY();//返回类型 m_qpBDOffsetY   (0)

      if( (g_uiMaxCUWidth>>uiDepth) >= rpcTempCU->getSlice()->getPPS()->getMinCuDQPSize() )//64>=64
      {
        Int idQP = m_pcEncCfg->getMaxDeltaQP();//配置文件中MaxDeltaQP设置为0.
        iMinQP = Clip3( -rpcTempCU->getSlice()->getSPS()->getQpBDOffsetY(), MAX_QP, iBaseQP-idQP );
        iMaxQP = Clip3( -rpcTempCU->getSlice()->getSPS()->getQpBDOffsetY(), MAX_QP, iBaseQP+idQP );//MAX_QP宏定义为51，同时MIN_QP宏定义为0
        if ( (rpcTempCU->getSlice()->getSPS()->getUseLossless()) && (lowestQP < iMinQP) && rpcTempCU->getSlice()->getPPS()->getUseDQP() )
        {
          isAddLowestQP = true;
          iMinQP = iMinQP - 1;
        }
      }
      else
      {
        iMinQP = rpcTempCU->getQP(0);
        iMaxQP = rpcTempCU->getQP(0);//配置文件设置为32
      }

    #if RATE_CONTROL_LAMBDA_DOMAIN
      if ( m_pcEncCfg->getUseRateCtrl() )
      {
        iMinQP = m_pcRateCtrl->getRCQP();
        iMaxQP = m_pcRateCtrl->getRCQP();
      }
    #else
      if(m_pcEncCfg->getUseRateCtrl())
      {
        Int qp = m_pcRateCtrl->getUnitQP();
        iMinQP  = Clip3( MIN_QP, MAX_QP, qp);
        iMaxQP  = Clip3( MIN_QP, MAX_QP, qp);
      }
    #endif

      // If slice start or slice end is within this cu...如果bSliceStart和bSliceStart都为false,则当前块需要长宽各缩小一倍
      TComSlice * pcSlice = rpcTempCU->getPic()->getSlice(rpcTempCU->getPic()->getCurrSliceIdx());
      Bool bSliceStart = pcSlice->getSliceSegmentCurStartCUAddr()>rpcTempCU->getSCUAddr()&&pcSlice->getSliceSegmentCurStartCUAddr()<rpcTempCU->getSCUAddr()+rpcTempCU->getTotalNumPart();
      Bool bSliceEnd = (pcSlice->getSliceSegmentCurEndCUAddr()>rpcTempCU->getSCUAddr()&&pcSlice->getSliceSegmentCurEndCUAddr()<rpcTempCU->getSCUAddr()+rpcTempCU->getTotalNumPart());

      // Structure TComSlice.cpp
      //,m_picWidthInLumaSamples  (352) //HM10.0允许处理的最小亮度采样宽度
      //,m_picHeightInLumaSamples (288) //HM10.0允许处理的最小亮度采样高度
      Bool bInsidePicture = ( uiRPelX < rpcBestCU->getSlice()->getSPS()->getPicWidthInLumaSamples() ) && ( uiBPelY < rpcBestCU->getSlice()->getSPS()->getPicHeightInLumaSamples() );
      // We need to split, so don't try these modes.
      if(!bSliceEnd && !bSliceStart && bInsidePicture )
      {
        for (Int iQP=iMinQP; iQP<=iMaxQP; iQP++)
        {
          if (isAddLowestQP && (iQP == iMinQP))
          {
            iQP = lowestQP;
          }
          // variables for fast encoder decision
          bEarlySkip  = false;
          bTrySplit   = true;
          fRD_Skip    = MAX_DOUBLE;//#define MAX_DOUBLE   1.7e+308 ///< max. value of double-type value

          rpcTempCU->initEstData( uiDepth, iQP );//当前CU初始化估计数据 对当前CU以4x4大小进行初始化
          // do inter modes, SKIP and 2Nx2N
          if( rpcBestCU->getSlice()->getSliceType() != I_SLICE )
          {
            // 2Nx2N
            if(m_pcEncCfg->getUseEarlySkipDetection())
            {
              //帧间预测模式---帧间2Nx2N时，率失真代价比较
              xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_2Nx2N );  rpcTempCU->initEstData( uiDepth, iQP );//by Competition for inter_2Nx2N
            }
              // SKIP Merge模式
            xCheckRDCostMerge2Nx2N( rpcBestCU, rpcTempCU, &earlyDetectionSkipMode );//by Merge for inter_2Nx2N
            rpcTempCU->initEstData( uiDepth, iQP );

            // fast encoder decision for early skip
            if ( m_pcEncCfg->getUseFastEnc() )
            {
              Int iIdx = g_aucConvertToBit[ rpcBestCU->getWidth(0) ];
              if ( aiNum [ iIdx ] > 5 && fRD_Skip < EARLY_SKIP_THRES*afCost[ iIdx ]/aiNum[ iIdx ] )
              {
                bEarlySkip = true;
                bTrySplit  = false;
              }
            }

            if(!m_pcEncCfg->getUseEarlySkipDetection())
            {
              // 2Nx2N, NxN
              if ( !bEarlySkip )
              {
                xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_2Nx2N );  rpcTempCU->initEstData( uiDepth, iQP );
                if(m_pcEncCfg->getUseCbfFastMode())
                {
                  doNotBlockPu = rpcBestCU->getQtRootCbf( 0 ) != 0;
                }
              }
            }
          }

          if( (g_uiMaxCUWidth>>uiDepth) >= rpcTempCU->getSlice()->getPPS()->getMinCuDQPSize() )//64>=64
          {
            if(iQP == iBaseQP)
            {
              bTrySplitDQP = bTrySplit;//bTrySplitDQP=true
            }
          }
          else
          {
            bTrySplitDQP = bTrySplit;//bTrySplitDQP=true
          }
          if (isAddLowestQP && (iQP == lowestQP))
          {
            iQP = iMinQP;
          }
        }

    #if RATE_CONTROL_LAMBDA_DOMAIN
        if ( uiDepth <= m_addSADDepth )
        {
          m_LCUPredictionSAD += m_temporalSAD;
          m_addSADDepth = uiDepth;
        }
    #endif

        if(!earlyDetectionSkipMode)
        {
          for (Int iQP=iMinQP; iQP<=iMaxQP; iQP++)
          {
            if (isAddLowestQP && (iQP == iMinQP))
            {
              iQP = lowestQP;
            }
            rpcTempCU->initEstData( uiDepth, iQP );

    //--------------------------------------------------帧间模式选择开始201348----------------------------------------------\\
            // do inter modes, NxN, 2NxN, and Nx2N
            if( rpcBestCU->getSlice()->getSliceType() != I_SLICE )
            {
              // 2Nx2N, NxN
              if ( !bEarlySkip )
              {
                if(!( (rpcBestCU->getWidth(0)==8) && (rpcBestCU->getHeight(0)==8) ))
                {
                  if( uiDepth == g_uiMaxCUDepth - g_uiAddCUDepth && doNotBlockPu)
                  {
                    xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_NxN   );
                    rpcTempCU->initEstData( uiDepth, iQP );
                  }
                }
              }

              // 2NxN, Nx2N
              if(doNotBlockPu)
              {
                xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_Nx2N  );
                rpcTempCU->initEstData( uiDepth, iQP );
                if(m_pcEncCfg->getUseCbfFastMode() && rpcBestCU->getPartitionSize(0) == SIZE_Nx2N )
                {
                  doNotBlockPu = rpcBestCU->getQtRootCbf( 0 ) != 0;
                }
              }
              if(doNotBlockPu)
              {
                xCheckRDCostInter      ( rpcBestCU, rpcTempCU, SIZE_2NxN  );
                rpcTempCU->initEstData( uiDepth, iQP );
                if(m_pcEncCfg->getUseCbfFastMode() && rpcBestCU->getPartitionSize(0) == SIZE_2NxN)
                {
                  doNotBlockPu = rpcBestCU->getQtRootCbf( 0 ) != 0;
                }
              }

    #if 1
              //! Try AMP (SIZE_2NxnU, SIZE_2NxnD, SIZE_nLx2N, SIZE_nRx2N)AMP: Asymmetric motion partitions 非对称运动分割
              if( pcPic->getSlice(0)->getSPS()->getAMPAcc(uiDepth) )
              {
    #if AMP_ENC_SPEEDUP
                Bool bTestAMP_Hor = false, bTestAMP_Ver = false;

    #if AMP_MRG
                Bool bTestMergeAMP_Hor = false, bTestMergeAMP_Ver = false;

                deriveTestModeAMP (rpcBestCU, eParentPartSize, bTestAMP_Hor, bTestAMP_Ver, bTestMergeAMP_Hor, bTestMergeAMP_Ver);
    #else
                deriveTestModeAMP (rpcBestCU, eParentPartSize, bTestAMP_Hor, bTestAMP_Ver);
    #endif

                //! Do horizontal AMP 水平非对称运动分割
                if ( bTestAMP_Hor )
                {
                  if(doNotBlockPu)
                  {
                    xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_2NxnU );
                    rpcTempCU->initEstData( uiDepth, iQP );
                    if(m_pcEncCfg->getUseCbfFastMode() && rpcBestCU->getPartitionSize(0) == SIZE_2NxnU )
                    {
                      doNotBlockPu = rpcBestCU->getQtRootCbf( 0 ) != 0;
                    }
                  }
                  if(doNotBlockPu)
                  {
                    xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_2NxnD );
                    rpcTempCU->initEstData( uiDepth, iQP );
                    if(m_pcEncCfg->getUseCbfFastMode() && rpcBestCU->getPartitionSize(0) == SIZE_2NxnD )
                    {
                      doNotBlockPu = rpcBestCU->getQtRootCbf( 0 ) != 0;
                    }
                  }
                }
    #if AMP_MRG
                else if ( bTestMergeAMP_Hor )
                {
                  if(doNotBlockPu)
                  {
                    xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_2NxnU, true );
                    rpcTempCU->initEstData( uiDepth, iQP );
                    if(m_pcEncCfg->getUseCbfFastMode() && rpcBestCU->getPartitionSize(0) == SIZE_2NxnU )
                    {
                      doNotBlockPu = rpcBestCU->getQtRootCbf( 0 ) != 0;
                    }
                  }
                  if(doNotBlockPu)
                  {
                    xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_2NxnD, true );
                    rpcTempCU->initEstData( uiDepth, iQP );
                    if(m_pcEncCfg->getUseCbfFastMode() && rpcBestCU->getPartitionSize(0) == SIZE_2NxnD )
                    {
                      doNotBlockPu = rpcBestCU->getQtRootCbf( 0 ) != 0;
                    }
                  }
                }
    #endif

                //! Do vertical AMP 垂直非对称运动分割
                if ( bTestAMP_Ver )
                {
                  if(doNotBlockPu)
                  {
                    xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_nLx2N );
                    rpcTempCU->initEstData( uiDepth, iQP );
                    if(m_pcEncCfg->getUseCbfFastMode() && rpcBestCU->getPartitionSize(0) == SIZE_nLx2N )
                    {
                      doNotBlockPu = rpcBestCU->getQtRootCbf( 0 ) != 0;
                    }
                  }
                  if(doNotBlockPu)
                  {
                    xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_nRx2N );
                    rpcTempCU->initEstData( uiDepth, iQP );
                  }
                }
    #if AMP_MRG
                else if ( bTestMergeAMP_Ver )
                {
                  if(doNotBlockPu)
                  {
                    xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_nLx2N, true );
                    rpcTempCU->initEstData( uiDepth, iQP );
                    if(m_pcEncCfg->getUseCbfFastMode() && rpcBestCU->getPartitionSize(0) == SIZE_nLx2N )
                    {
                      doNotBlockPu = rpcBestCU->getQtRootCbf( 0 ) != 0;
                    }
                  }
                  if(doNotBlockPu)
                  {
                    xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_nRx2N, true );
                    rpcTempCU->initEstData( uiDepth, iQP );
                  }
                }
    #endif

    #else
                xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_2NxnU );
                rpcTempCU->initEstData( uiDepth, iQP );
                xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_2NxnD );
                rpcTempCU->initEstData( uiDepth, iQP );
                xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_nLx2N );
                rpcTempCU->initEstData( uiDepth, iQP );

                xCheckRDCostInter( rpcBestCU, rpcTempCU, SIZE_nRx2N );
                rpcTempCU->initEstData( uiDepth, iQP );

    #endif
              }
    #endif
            }
    //------------------------------------------------------帧间模式选择结束----------------------------------------------\\

    //------------------------------------------------------帧内模式选择开始201348----------------------------------------------\\
            // do normal intra modes
            if ( !bEarlySkip )//bEarlySkip=false
            {

                ///// texture component type
                //enum TextType
                //{
                //    TEXT_LUMA,            ///< luma            0
                //    TEXT_CHROMA,          ///< chroma (U+V)    1
                //    TEXT_CHROMA_U,        ///< chroma U        2
                //    TEXT_CHROMA_V,        ///< chroma V        3
                //    TEXT_ALL,             ///< Y+U+V           4
                //    TEXT_NONE = 15
                //};
              // speedup for inter frames
              if( rpcBestCU->getSlice()->getSliceType() == I_SLICE ||
                rpcBestCU->getCbf( 0, TEXT_LUMA     ) != 0   ||
                rpcBestCU->getCbf( 0, TEXT_CHROMA_U ) != 0   ||
                rpcBestCU->getCbf( 0, TEXT_CHROMA_V ) != 0     ) // avoid very complex intra if it is unlikely
              {
                 //帧内预测式---只有2Nx2N,NxN两种模式
                xCheckRDCostIntra( rpcBestCU, rpcTempCU, SIZE_2Nx2N );
                rpcTempCU->initEstData( uiDepth, iQP );
                if( uiDepth == g_uiMaxCUDepth - g_uiAddCUDepth )
                {
                  if( rpcTempCU->getWidth(0) > ( 1 << rpcTempCU->getSlice()->getSPS()->getQuadtreeTULog2MinSize() ) )
                  {
                    xCheckRDCostIntra( rpcBestCU, rpcTempCU, SIZE_NxN   );
                    rpcTempCU->initEstData( uiDepth, iQP );
                  }
                }
              }
            }
    //------------------------------------------------------帧内模式选择结束----------------------------------------------
            // test PCM测试PCM模式，一般不使用这种模式
            if(pcPic->getSlice(0)->getSPS()->getUsePCM()
              && rpcTempCU->getWidth(0) <= (1<<pcPic->getSlice(0)->getSPS()->getPCMLog2MaxSize())
              && rpcTempCU->getWidth(0) >= (1<<pcPic->getSlice(0)->getSPS()->getPCMLog2MinSize()) )
            {
              UInt uiRawBits = (2 * g_bitDepthY + g_bitDepthC) * rpcBestCU->getWidth(0) * rpcBestCU->getHeight(0) / 2;
              UInt uiBestBits = rpcBestCU->getTotalBits();
              if((uiBestBits > uiRawBits) || (rpcBestCU->getTotalCost() > m_pcRdCost->calcRdCost(uiRawBits, 0)))
              {
                xCheckIntraPCM (rpcBestCU, rpcTempCU);
                rpcTempCU->initEstData( uiDepth, iQP );
              }
            }
            if (isAddLowestQP && (iQP == lowestQP))
            {
              iQP = iMinQP;
            }
          }
        }

        m_pcEntropyCoder->resetBits();
        m_pcEntropyCoder->encodeSplitFlag( rpcBestCU, 0, uiDepth, true );
        rpcBestCU->getTotalBits() += m_pcEntropyCoder->getNumberOfWrittenBits(); // split bits
        if(m_pcEncCfg->getUseSBACRD())
        {
          rpcBestCU->getTotalBins() += ((TEncBinCABAC *)((TEncSbac*)m_pcEntropyCoder->m_pcEntropyCoderIf)->getEncBinIf())->getBinsCoded();
        }
        rpcBestCU->getTotalCost()  = m_pcRdCost->calcRdCost( rpcBestCU->getTotalBits(), rpcBestCU->getTotalDistortion() );

        // accumulate statistics for early skip
        if ( m_pcEncCfg->getUseFastEnc() )
        {
          if ( rpcBestCU->isSkipped(0) )
          {
            Int iIdx = g_aucConvertToBit[ rpcBestCU->getWidth(0) ];
            afCost[ iIdx ] += rpcBestCU->getTotalCost();
            aiNum [ iIdx ] ++;
          }
        }

        // Early CU determination
        if( m_pcEncCfg->getUseEarlyCU() && rpcBestCU->isSkipped(0) )
        {
          bSubBranch = false;
        }
        else
        {
          bSubBranch = true;
        }
      }
      else if(!(bSliceEnd && bInsidePicture))
      {
        bBoundary = true;
    #if RATE_CONTROL_LAMBDA_DOMAIN
        m_addSADDepth++;
    #endif
      }

      // copy orginal YUV samples to PCM buffer
      if( rpcBestCU->isLosslessCoded(0) && (rpcBestCU->getIPCMFlag(0) == false))
      {
        xFillPCMBuffer(rpcBestCU, m_ppcOrigYuv[uiDepth]);
      }
      if( (g_uiMaxCUWidth>>uiDepth) == rpcTempCU->getSlice()->getPPS()->getMinCuDQPSize() )
      {
        Int idQP = m_pcEncCfg->getMaxDeltaQP();
        iMinQP = Clip3( -rpcTempCU->getSlice()->getSPS()->getQpBDOffsetY(), MAX_QP, iBaseQP-idQP );
        iMaxQP = Clip3( -rpcTempCU->getSlice()->getSPS()->getQpBDOffsetY(), MAX_QP, iBaseQP+idQP );
        if ( (rpcTempCU->getSlice()->getSPS()->getUseLossless()) && (lowestQP < iMinQP) && rpcTempCU->getSlice()->getPPS()->getUseDQP() )
        {
          isAddLowestQP = true;
          iMinQP = iMinQP - 1;
        }
      }
      else if( (g_uiMaxCUWidth>>uiDepth) > rpcTempCU->getSlice()->getPPS()->getMinCuDQPSize() )
      {
        iMinQP = iBaseQP;
        iMaxQP = iBaseQP;
      }
      else
      {
        Int iStartQP;
        if( pcPic->getCU( rpcTempCU->getAddr() )->getSliceSegmentStartCU(rpcTempCU->getZorderIdxInCU()) == pcSlice->getSliceSegmentCurStartCUAddr())
        {
          iStartQP = rpcTempCU->getQP(0);
        }
        else
        {
          UInt uiCurSliceStartPartIdx = pcSlice->getSliceSegmentCurStartCUAddr() % pcPic->getNumPartInCU() - rpcTempCU->getZorderIdxInCU();
          iStartQP = rpcTempCU->getQP(uiCurSliceStartPartIdx);
        }
        iMinQP = iStartQP;
        iMaxQP = iStartQP;
      }
    #if RATE_CONTROL_LAMBDA_DOMAIN
      if ( m_pcEncCfg->getUseRateCtrl() )
      {
        iMinQP = m_pcRateCtrl->getRCQP();
        iMaxQP = m_pcRateCtrl->getRCQP();
      }
    #else
      if(m_pcEncCfg->getUseRateCtrl())
      {
        Int qp = m_pcRateCtrl->getUnitQP();
        iMinQP  = Clip3( MIN_QP, MAX_QP, qp);
        iMaxQP  = Clip3( MIN_QP, MAX_QP, qp);
      }
    #endif
      for (Int iQP=iMinQP; iQP<=iMaxQP; iQP++)
      {
        if (isAddLowestQP && (iQP == iMinQP))
        {
          iQP = lowestQP;
        }
        rpcTempCU->initEstData( uiDepth, iQP );

        // further split 进一步进行CU分割
        if( bSubBranch && bTrySplitDQP && uiDepth < g_uiMaxCUDepth - g_uiAddCUDepth )
        {
          UChar       uhNextDepth         = uiDepth+1;
          TComDataCU* pcSubBestPartCU     = m_ppcBestCU[uhNextDepth];
          TComDataCU* pcSubTempPartCU     = m_ppcTempCU[uhNextDepth];

          for ( UInt uiPartUnitIdx = 0; uiPartUnitIdx < 4; uiPartUnitIdx++ )
          {
            pcSubBestPartCU->initSubCU( rpcTempCU, uiPartUnitIdx, uhNextDepth, iQP ); // clear sub partition datas or init.
            pcSubTempPartCU->initSubCU( rpcTempCU, uiPartUnitIdx, uhNextDepth, iQP ); // clear sub partition datas or init.

            Bool bInSlice = pcSubBestPartCU->getSCUAddr()+pcSubBestPartCU->getTotalNumPart()>pcSlice->getSliceSegmentCurStartCUAddr()&&pcSubBestPartCU->getSCUAddr()<pcSlice->getSliceSegmentCurEndCUAddr();
            if(bInSlice && ( pcSubBestPartCU->getCUPelX() < pcSlice->getSPS()->getPicWidthInLumaSamples() ) && ( pcSubBestPartCU->getCUPelY() < pcSlice->getSPS()->getPicHeightInLumaSamples() ) )
            {
              if( m_bUseSBACRD )
              {
                if ( 0 == uiPartUnitIdx) //initialize RD with previous depth buffer
                {
                  m_pppcRDSbacCoder[uhNextDepth][CI_CURR_BEST]->load(m_pppcRDSbacCoder[uiDepth][CI_CURR_BEST]);
                }
                else
                {
                  m_pppcRDSbacCoder[uhNextDepth][CI_CURR_BEST]->load(m_pppcRDSbacCoder[uhNextDepth][CI_NEXT_BEST]);
                }
              }

    #if AMP_ENC_SPEEDUP
              if ( rpcBestCU->isIntra(0) )
              {
                xCompressCU( pcSubBestPartCU, pcSubTempPartCU, uhNextDepth, SIZE_NONE );//递归函数
              }
              else
              {
                xCompressCU( pcSubBestPartCU, pcSubTempPartCU, uhNextDepth, rpcBestCU->getPartitionSize(0) );//递归函数
              }
    #else
              xCompressCU( pcSubBestPartCU, pcSubTempPartCU, uhNextDepth );
    #endif

              rpcTempCU->copyPartFrom( pcSubBestPartCU, uiPartUnitIdx, uhNextDepth );// Keep best part data to current temporary data.
              xCopyYuv2Tmp( pcSubBestPartCU->getTotalNumPart()*uiPartUnitIdx, uhNextDepth );
            }
            else if (bInSlice)
            {
              pcSubBestPartCU->copyToPic( uhNextDepth );
              rpcTempCU->copyPartFrom( pcSubBestPartCU, uiPartUnitIdx, uhNextDepth );
            }
          }

          if( !bBoundary )
          {
            m_pcEntropyCoder->resetBits();
            m_pcEntropyCoder->encodeSplitFlag( rpcTempCU, 0, uiDepth, true );

            rpcTempCU->getTotalBits() += m_pcEntropyCoder->getNumberOfWrittenBits(); // split bits
            if(m_pcEncCfg->getUseSBACRD())
            {
              rpcTempCU->getTotalBins() += ((TEncBinCABAC *)((TEncSbac*)m_pcEntropyCoder->m_pcEntropyCoderIf)->getEncBinIf())->getBinsCoded();
            }
          }
          rpcTempCU->getTotalCost()  = m_pcRdCost->calcRdCost( rpcTempCU->getTotalBits(), rpcTempCU->getTotalDistortion() );

          if( (g_uiMaxCUWidth>>uiDepth) == rpcTempCU->getSlice()->getPPS()->getMinCuDQPSize() && rpcTempCU->getSlice()->getPPS()->getUseDQP())
          {
            Bool hasResidual = false;
            for( UInt uiBlkIdx = 0; uiBlkIdx < rpcTempCU->getTotalNumPart(); uiBlkIdx ++)
            {
              if( ( pcPic->getCU( rpcTempCU->getAddr() )->getSliceSegmentStartCU(uiBlkIdx+rpcTempCU->getZorderIdxInCU()) == rpcTempCU->getSlice()->getSliceSegmentCurStartCUAddr() ) &&
                  ( rpcTempCU->getCbf( uiBlkIdx, TEXT_LUMA ) || rpcTempCU->getCbf( uiBlkIdx, TEXT_CHROMA_U ) || rpcTempCU->getCbf( uiBlkIdx, TEXT_CHROMA_V ) ) )
              {
                hasResidual = true;
                break;
              }
            }

            UInt uiTargetPartIdx;
            if ( pcPic->getCU( rpcTempCU->getAddr() )->getSliceSegmentStartCU(rpcTempCU->getZorderIdxInCU()) != pcSlice->getSliceSegmentCurStartCUAddr() )
            {
              uiTargetPartIdx = pcSlice->getSliceSegmentCurStartCUAddr() % pcPic->getNumPartInCU() - rpcTempCU->getZorderIdxInCU();
            }
            else
            {
              uiTargetPartIdx = 0;
            }
            if ( hasResidual )
            {
    #if !RDO_WITHOUT_DQP_BITS
              m_pcEntropyCoder->resetBits();
              m_pcEntropyCoder->encodeQP( rpcTempCU, uiTargetPartIdx, false );
              rpcTempCU->getTotalBits() += m_pcEntropyCoder->getNumberOfWrittenBits(); // dQP bits
              if(m_pcEncCfg->getUseSBACRD())
              {
                rpcTempCU->getTotalBins() += ((TEncBinCABAC *)((TEncSbac*)m_pcEntropyCoder->m_pcEntropyCoderIf)->getEncBinIf())->getBinsCoded();
              }
              rpcTempCU->getTotalCost()  = m_pcRdCost->calcRdCost( rpcTempCU->getTotalBits(), rpcTempCU->getTotalDistortion() );
    #endif

              Bool foundNonZeroCbf = false;
              rpcTempCU->setQPSubCUs( rpcTempCU->getRefQP( uiTargetPartIdx ), rpcTempCU, 0, uiDepth, foundNonZeroCbf );
              assert( foundNonZeroCbf );
            }
            else
            {
              rpcTempCU->setQPSubParts( rpcTempCU->getRefQP( uiTargetPartIdx ), 0, uiDepth ); // set QP to default QP
            }
          }

          if( m_bUseSBACRD )
          {
            m_pppcRDSbacCoder[uhNextDepth][CI_NEXT_BEST]->store(m_pppcRDSbacCoder[uiDepth][CI_TEMP_BEST]);
          }
          Bool isEndOfSlice        = rpcBestCU->getSlice()->getSliceMode()==FIXED_NUMBER_OF_BYTES
                                     && (rpcBestCU->getTotalBits()>rpcBestCU->getSlice()->getSliceArgument()<<3);
          Bool isEndOfSliceSegment = rpcBestCU->getSlice()->getSliceSegmentMode()==FIXED_NUMBER_OF_BYTES
                                     && (rpcBestCU->getTotalBits()>rpcBestCU->getSlice()->getSliceSegmentArgument()<<3);
          if(isEndOfSlice||isEndOfSliceSegment)
          {
            rpcBestCU->getTotalCost()=rpcTempCU->getTotalCost()+1;
          }
          xCheckBestMode( rpcBestCU, rpcTempCU, uiDepth);  // RD compare current larger prediction
        }                                                  // with sub partitioned prediction.判断决定是否选择本层CU还是下层CU
        if (isAddLowestQP && (iQP == lowestQP))
        {
          iQP = iMinQP;
        }
      }

      rpcBestCU->copyToPic(uiDepth);  // Copy Best data to Picture for next partition prediction.

      xCopyYuv2Pic( rpcBestCU->getPic(), rpcBestCU->getAddr(), rpcBestCU->getZorderIdxInCU(), uiDepth, uiDepth, rpcBestCU, uiLPelX, uiTPelY );   // Copy Yuv data to picture Yuv
      if( bBoundary ||(bSliceEnd && bInsidePicture))
      {
        return;
      }

      // Assert if Best prediction mode is NONE
      // Selected mode's RD-cost must be not MAX_DOUBLE.
      assert( rpcBestCU->getPartitionSize ( 0 ) != SIZE_NONE  );
      assert( rpcBestCU->getPredictionMode( 0 ) != MODE_NONE  );
      assert( rpcBestCU->getTotalCost     (   ) != MAX_DOUBLE );
    }
```



  
  
