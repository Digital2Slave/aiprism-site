# HEVC-Tool list

//====== Tool list ========
Bool m_bUseSBACRD;//the use of bit counts from arithmetic coder in rate-distortion decisions√   
Bool m_bUseASR; //自适应搜索范围 Adaptive Search Range√  
Bool m_bUseHADME; //运动估计(ME)时用哈德曼变换√  


```
//the use of the combined reference list for uni-prediction in B-slices
//0 Reference list 0 and reference list 1 are identical and reference list 0 is used as the combined reference list
//1 The combined reference list is derived from reference list 0 and reference list 1
//NB LComb can only be 0 in low delay coding(more precisely, when list 0 and list 1 are the same.√
```


Bool m_bUseLComb;  
Bool m_useRDOQ; //率失真优化量化√  
Bool m_useRDOQTS; //RDOQ for transform skipped TU√ 