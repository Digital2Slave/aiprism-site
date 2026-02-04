# HEVC-初始化估计数据(帧间帧内)




```
    /** initialize prediction data with enabling sub-LCU-level delta QP
    *\param  uiDepth  depth of the current CU
    *\param  qp     qp for the current CU
    *- set CU width and CU height according to depth
    *- set qp value according to input qp
    *- set last-coded qp value according to input last-coded qp
    */
    Void TComDataCU::initEstData( UInt uiDepth, Int qp )
    {
      m_dTotalCost         = MAX_DOUBLE;//double 类型成员函数 总的分割代价sum of partition RD costs
      m_uiTotalDistortion  = 0;         //无符号int 类型变量  总的分割失真sum of partition distortion
      m_uiTotalBits        = 0;         //sum of partition bits  bits是编码后的比特数
      m_uiTotalBins        = 0;         //sum of partition bins  bin是句法元素的二进制位数


      UChar uhWidth  = g_uiMaxCUWidth  >> uiDepth;
      UChar uhHeight = g_uiMaxCUHeight >> uiDepth;

      for (UInt ui = 0; ui < m_uiNumPartition; ui++)//64x64/4x4=256
      {
          if(getPic()->getPicSym()->getInverseCUOrderMap(getAddr())*m_pcPic->getNumPartInCU()+m_uiAbsIdxInLCU+ui >= getSlice()->getSliceSegmentCurStartCUAddr())
        {
          //Char*  m_apiMVPIdx[2]; ///< array of motion vector predictor candidates
          //Char*  m_apiMVPNum[2]; ///< array of number of possible motion vectors predictors单向预测和双向预测
          m_apiMVPIdx[0][ui] = -1;
          m_apiMVPIdx[1][ui] = -1;
          m_apiMVPNum[0][ui] = -1;
          m_apiMVPNum[1][ui] = -1;
          m_puhDepth  [ui] = uiDepth;
          m_puhWidth  [ui] = uhWidth;
          m_puhHeight [ui] = uhHeight;
          m_puhTrIdx  [ui] = 0;
          //UChar* m_puhTransformSkip[3];///< array of transform skipping flags
          m_puhTransformSkip[0][ui] = 0;//QP for Y
          m_puhTransformSkip[1][ui] = 0;//QP forCb
          m_puhTransformSkip[2][ui] = 0;//QP forCr from JCTVC-L1003_v34.doc 8.6.2    Scaling and transformation process
          m_skipFlag[ui]   = false;
          m_pePartSize[ui] = SIZE_NONE; // SIZE_NONE=15 不支持帧内帧间分割模式
          m_pePredMode[ui] = MODE_NONE; // MODE_NONE = 15 不是帧内帧间预测模式
          m_CUTransquantBypass[ui] = false;
          m_pbIPCMFlag[ui] = 0;
          m_phQP[ui] = qp;
          m_pbMergeFlag[ui] = 0;
          m_puhMergeIndex[ui] = 0;
          m_puhLumaIntraDir[ui] = DC_IDX;//#define DC_IDX  1  //index for intra DC mode
          m_puhChromaIntraDir[ui] = 0;
          m_puhInterDir[ui] = 0;
          //UChar*   m_puhCbf[3];  ///< array of coded block flags (CBF)
          m_puhCbf[0][ui] = 0;
          m_puhCbf[1][ui] = 0;
          m_puhCbf[2][ui] = 0;
        }
      }

      UInt uiTmp = uhWidth*uhHeight;

      if(getPic()->getPicSym()->getInverseCUOrderMap(getAddr())*m_pcPic->getNumPartInCU()+m_uiAbsIdxInLCU >= getSlice()->getSliceSegmentCurStartCUAddr())
      {
        m_acCUMvField[0].clearMvField();
        m_acCUMvField[1].clearMvField();
        uiTmp = uhWidth*uhHeight;

        //亮度采样系数缓冲器 3种
        memset( m_pcTrCoeffY,    0, uiTmp * sizeof( *m_pcTrCoeffY    ) );
    #if ADAPTIVE_QP_SELECTION
        memset( m_pcArlCoeffY ,  0, uiTmp * sizeof( *m_pcArlCoeffY   ) );
    #endif
        memset( m_pcIPCMSampleY, 0, uiTmp * sizeof( *m_pcIPCMSampleY ) );

        //色度采样系统缓冲器 3种
        uiTmp>>=2;//除以4，对于色度长宽各减半
        //Tr:transformed变换后的
        memset( m_pcTrCoeffCb,    0, uiTmp * sizeof( *m_pcTrCoeffCb    ) );
        memset( m_pcTrCoeffCr,    0, uiTmp * sizeof( *m_pcTrCoeffCr    ) );
    #if ADAPTIVE_QP_SELECTION
        //采用自适应QP选择 ARL:Adaptive Reconstruction Level
        memset( m_pcArlCoeffCb,   0, uiTmp * sizeof( *m_pcArlCoeffCb   ) );
        memset( m_pcArlCoeffCr,   0, uiTmp * sizeof( *m_pcArlCoeffCr   ) );
    #endif
        //采用PCM模式进行色度采样
        memset( m_pcIPCMSampleCb, 0, uiTmp * sizeof( *m_pcIPCMSampleCb ) );
        memset( m_pcIPCMSampleCr, 0, uiTmp * sizeof( *m_pcIPCMSampleCr ) );
      }
    }
```



  