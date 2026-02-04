# HEVC配置文件解读

#======== File I/O =====================

BitstreamFile[[I1]](http://write.blog.csdn.net/postedit#_msocom_1) : F:\\\HEVCres\\\BasketballDrill_832x480_50_str.bin

ReconFile [[I2]](http://write.blog.csdn.net/postedit#_msocom_2) : F:\\\HEVCres\\\BasketballDrill_832x480_50_rec.yuv

#======== Unit definition ================

MaxCUWidth : 64 # Maximum coding unit width in pixel

MaxCUHeight : 64[[I3]](http://write.blog.csdn.net/postedit#_msocom_3) # Maximum coding unit height in pixel

MaxPartitionDepth : 4[[I4]](http://write.blog.csdn.net/postedit#_msocom_4) # Maximum coding unit depth

QuadtreeTULog2MaxSize : 5 # Log2 of maximum transform size for

# quadtree-based TU coding (2...6)

QuadtreeTULog2MinSize : 2 # Log2 of minimum transform size for

# quadtree-based TU coding (2...6)[[I5]](http://write.blog.csdn.net/postedit#_msocom_5)

QuadtreeTUMaxDepthInter : 3[[I6]](http://write.blog.csdn.net/postedit#_msocom_6)

QuadtreeTUMaxDepthIntra : 3

#======== Coding Structure =============

IntraPeriod : 1 # Period of I-Frame ( -1 = only first)

DecodingRefreshType : 0 # Random Accesss[[I7]](http://write.blog.csdn.net/postedit#_msocom_7) 0:none, 1:CDR, 2:IDR

GOPSize : 1 # GOP Size (number of B slice = GOPSize-1)

#Type POC QPoffset QPfactor tcOffsetDiv2 betaOffsetDiv2 temporal_id

#ref_pics_active 

#ref_pics reference pictures 

#=========== Motion Search =============

FastSearch [[I8]](http://write.blog.csdn.net/postedit#_msocom_8) : 1 # 0:Full search 1:TZ search

SearchRange : 64 #  (0: Search range is a Full frame)

HadamardME : 1 # Use of hadamard measure for fractional ME[[I9]](http://write.blog.csdn.net/postedit#_msocom_9)

FEN : 1 #  Fast encoder decision

FDM : 1 #  Fast Decision for Merge RD cost

#======== Quantization =============

QP : 32 # Quantization parameter(0-51)[[I10]](http://write.blog.csdn.net/postedit#_msocom_10)

MaxDeltaQP : 0 # CU-based multi-QP optimization[[I11]](http://write.blog.csdn.net/postedit#_msocom_11)

MaxCuDQPDepth : 0 #  Max depth of a minimum CuDQP for sub-LCU-level delta QP

DeltaQpRD : 0 # Slice-based multi-QP optimization[[I12]](http://write.blog.csdn.net/postedit#_msocom_12)

RDOQ : 1 # RDOQ[[I13]](http://write.blog.csdn.net/postedit#_msocom_13)

RDOQTS : 1 # RDOQ for  transform skip

#=========== Deblock Filter ============

DeblockingFilterControlPresent : 0 # Dbl control params present [[I14]](http://write.blog.csdn.net/postedit#_msocom_14) (0=not present, 1=present)

LoopFilterOffsetInPPS[[I15]](http://write.blog.csdn.net/postedit#_msocom_15) : 0 # Dbl params: 

0=varying params in SliceHeader,  param = base_param + GOP_offset_param; 

1=constant params in PPS,  param = base_param

LoopFilterDisable : 0 # Disable deblocking filter (0=Filter, 1=No Filter)

LoopFilterBetaOffset_div2 : 0 # base_param: -13 ~ 13

LoopFilterTcOffset_div2 : 0 # base_param: -13 ~ 13

#=========== Misc. ============

InternalBitDepth : 8 # codec operating bit-depth[[I16]](http://write.blog.csdn.net/postedit#_msocom_16)

#=========== Coding Tools =================

SAO : 1 # Sample adaptive offset[[I17]](http://write.blog.csdn.net/postedit#_msocom_17) (0: OFF, 1: ON)

AMP : 1 # Asymmetric motion partitions[[I18]](http://write.blog.csdn.net/postedit#_msocom_18) (0: OFF, 1: ON)

TransformSkip : 1 # Transform skipping[[I19]](http://write.blog.csdn.net/postedit#_msocom_19) (0: OFF, 1: ON)

TransformSkipFast : 1 # Fast Transform skipping[[I20]](http://write.blog.csdn.net/postedit#_msocom_20) (0: OFF, 1: ON)

SAOLcuBoundary : 0 # SAOLcuBoundary using non-deblocked pixels[[I21]](http://write.blog.csdn.net/postedit#_msocom_21) (0: OFF, 1: ON)

#============ Slices ================

SliceMode : 0 

# 0: Disable all slice options.

# 1: Enforce maximum number of LCU in an slice,

# 2: Enforce maximum number of bytes in an 'slice'

# 3: Enforce maximum number of tiles in a slice

SliceArgument : 1500 

# Argument for 'SliceMode'.

# If SliceMode==1 it represents max. SliceGranularity-sized blocks per slice.

# If SliceMode==2 it represents max. bytes per slice.

# If SliceMode==3 it represents max. tiles per slice.

LFCrossSliceBoundaryFlag : 1 

# In-loop filtering, including ALF and DB, is across or not across slice boundary.[[I22]](http://write.blog.csdn.net/postedit#_msocom_22)

# 0:not across, 1: across

#============ PCM ================

PCMEnabledFlag : 0 # 0: No PCM mode

PCMLog2MaxSize : 5[[I23]](http://write.blog.csdn.net/postedit#_msocom_23) # Log2 of maximum PCM block size.

PCMLog2MinSize : 3[[I24]](http://write.blog.csdn.net/postedit#_msocom_24) # Log2 of minimum PCM block size.

PCMInputBitDepthFlag : 1 

# 0: PCM bit-depth is internal bit-depth.  1: PCM bit-depth is input bit-depth.

PCMFilterDisableFlag : 0 

# 0: Enable loop filtering on I_PCM samples. 1: Disable loop filtering on I_PCM samples.

#============ Tiles ================

UniformSpacingIdc : 0 

# 0: the column boundaries are indicated by ColumnWidth array[[I25]](http://write.blog.csdn.net/postedit#_msocom_25) , the row boundaries are indicated by RowHeight array

# 1: the column and row boundaries are distributed uniformly

NumTileColumnsMinus1 : 0 #  Number of columns in a picture minus 1

ColumnWidthArray : 2 3 

# Array containing ColumnWidth values in units of LCU (from left to right in picture)

NumTileRowsMinus1 : 0 #  Number of rows in a picture minus 1

RowHeightArray : 2 

# Array containing RowHeight values in units of LCU (from top to bottom in picture)

LFCrossTileBoundaryFlag : 1 # In-loop filtering is across or not across tile boundary.

# 0:not across, 1: across 

#============ WaveFront[[I26]](http://write.blog.csdn.net/postedit#_msocom_26) ================

WaveFrontSynchro[[I27]](http://write.blog.csdn.net/postedit#_msocom_27) : 0 

# 0: No WaveFront synchronisation (WaveFrontSubstreams must be 1 in this case).

# >0: WaveFront synchronises with the LCU above and to the right by this many LCUs.

#=========== Quantization Matrix =================

ScalingList : 0 #  ScalingList 0 : off, 1 : default, 2 : file read

ScalingListFile : scaling_list.txt

# Scaling[[I28]](http://write.blog.csdn.net/postedit#_msocom_28) List file name. If file is not exist, use Default Matrix.

#============ Lossless ================

TransquantBypassEnableFlag : 0 # Value of PPS flag[[I29]](http://write.blog.csdn.net/postedit#_msocom_29) .

CUTransquantBypassFlagValue : 0 

#Constant lossless-value signaling per CU, if TransquantBypassEnableFlag is 1.

### DO NOT ADD ANYTHING BELOW THIS LINE ###

### DO NOT DELETE THE EMPTY LINE BELOW ###

* * *

[[I1]](http://write.blog.csdn.net/postedit#_msoanchor_1)编码后获得的码流

[[I2]](http://write.blog.csdn.net/postedit#_msoanchor_2)重建文件，即获得的编码视频文件

[[I3]](http://write.blog.csdn.net/postedit#_msoanchor_3)最大编码单元TCU(LCU)

[[I4]](http://write.blog.csdn.net/postedit#_msoanchor_4)最大深度4，深度范围[0,1,2,3]其中0表示64x64，1表示32x32，2表示16x16，3表示8x8.

[[I5]](http://write.blog.csdn.net/postedit#_msoanchor_5)log以2为底4的对数2;

log以2为底8的对数3;

log以2为底16的对数4;

log以2为底32的对数5;

log以2为底64的对数6;

[[I6]](http://write.blog.csdn.net/postedit#_msoanchor_6)3表示8x8

[[I7]](http://write.blog.csdn.net/postedit#_msoanchor_7)解码更新类型，即随机接入类型

[[I8]](http://write.blog.csdn.net/postedit#_msoanchor_8)快速搜索类型，0:全搜索，1:TZ搜索

[[I9]](http://write.blog.csdn.net/postedit#_msoanchor_9)分数（像素位置）运动估计

[[I10]](http://write.blog.csdn.net/postedit#_msoanchor_10)量化参数范围0-51

[[I11]](http://write.blog.csdn.net/postedit#_msoanchor_11)多QP最优化

[[I12]](http://write.blog.csdn.net/postedit#_msoanchor_12)基于片的多QP最优化

[[I13]](http://write.blog.csdn.net/postedit#_msoanchor_13)率失真优化Q？

[[I14]](http://write.blog.csdn.net/postedit#_msoanchor_14)Dbl控制是否使用去块滤波器

[[I15]](http://write.blog.csdn.net/postedit#_msoanchor_15)PPS: picture parameter set

[[I16]](http://write.blog.csdn.net/postedit#_msoanchor_16)编解码控制比特深度，这个应该表示主要档次，即MAIN。

[[I17]](http://write.blog.csdn.net/postedit#_msoanchor_17)采样自适应偏移

[[I18]](http://write.blog.csdn.net/postedit#_msoanchor_18)非对称运动分割

[[I19]](http://write.blog.csdn.net/postedit#_msoanchor_19)变换过程跳过

[[I20]](http://write.blog.csdn.net/postedit#_msoanchor_20)快速变换过程跳过

[[I21]](http://write.blog.csdn.net/postedit#_msoanchor_21)SAOLCU边界像素用未经过去块滤波操作的像素值表示

[[I22]](http://write.blog.csdn.net/postedit#_msoanchor_22)ALF和DB两个滤波器在片边界是否相交

[[I23]](http://write.blog.csdn.net/postedit#_msoanchor_23)PCM块最大为32x32

[[I24]](http://write.blog.csdn.net/postedit#_msoanchor_24)PCM块最小为8x8

[[I25]](http://write.blog.csdn.net/postedit#_msoanchor_25)Tiles的列边界由列宽数组决定

[[I26]](http://write.blog.csdn.net/postedit#_msoanchor_26)WPP并行处理同步可以参考overview

[[I27]](http://write.blog.csdn.net/postedit#_msoanchor_27)WPP并行处理同步

[[I28]](http://write.blog.csdn.net/postedit#_msoanchor_28)这里用的是默认配置

[[I29]](http://write.blog.csdn.net/postedit#_msoanchor_29)PPS: Picture parameter set