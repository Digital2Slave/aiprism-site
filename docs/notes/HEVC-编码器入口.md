# HEVC-编码器入口

1.encmain.cpp:  
//call encoding function调用编码函数===>编码函数入口!!!
cTAppEncTop.encode();   
  
2.TAppEncTop.cpp:  
//call encoding function for one frame每读入一帧YUV调用一次!!!
m_cTEncTop.encode( bEos, flush ? 0 : pcPicYuvOrg, m_cListPicYuvRec, outputAccessUnits, iNumEncoded );  
  
3.TEncTop.cpp:  
//compress GOP帧编码相关函数!!!
m_cGOPEncoder.compressGOP(m_iPOCLast, m_iNumPicRcvd, m_cListPic, rcListPicYuvRecOut, accessUnitsOut);  
  
4.TEnGOP:cpp:  
//在最好的lamuda下进行编码。对每个sice进行编码!!!
m_pcSliceEncoder->compressSlice ( pcPic );  
  
5.TEncSlice.cpp:  
//run CU encoder 进行CU编码!!!
m_pcCuEncoder->compressCU( pcCU );  
  
6.TEncCu.cpp:  
//analysis of CU 获取最佳PU为m_ppcBestCU[0]!!!
xCompressCU( m_ppcBestCU[0], m_ppcTempCU[0], 0 );  
  
7.TEncCu.cpp:  
Void TEncCu::xCheckRDCostInter( TComDataCU*& rpcBestCU, TComDataCU*& rpcTempCU, PartSize ePartSize, Bool bUseMRG)  
Void TEncCu::xCheckRDCostIntra( TComDataCU*& rpcBestCU, TComDataCU*& rpcTempCU, PartSize eSize )  
  
8.TEncCu.cpp:  
Void TEncCu::xCheckRDCostIntra( TComDataCU*& rpcBestCU, TComDataCU*& rpcTempCU, PartSize eSize )  
这个函数内部实现对亮度和色度的预测；即：estIntraPredQT和estIntraPredChromaQT  
  
9.TEnSearch.cpp:  
Void TEncSearch::estIntraPredQT（......）中有四个关键的函数！  
①：predIntraLumaAng实现了方向的预测  
②：calcHAD函数计算了SATD  
③：xModeBitsIntra函数计算编码的码率  
④：xUpdateCandList更新最好的RDCost所使用的模式 