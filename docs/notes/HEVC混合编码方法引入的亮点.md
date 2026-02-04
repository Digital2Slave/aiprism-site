# HEVC混合编码方法引入的亮点

HEVC混合编码方法引入的亮点：(翻译能力有限，不当之处，欢迎指正，谢谢）

1） 编码树单元（CTU,coding tree units）和编码树块(CTB,coding tree block)结构

以前标准编码层的核心是宏块，通常是4:2:0格式，包含一个16x16亮度采样块和两个相应的8x8色度采样块。然而，HEVC中类似的结构是CTU，它的大小由编码器决定，并且它可以比传统的宏块要大。一个CTU由一个亮度CTB(CTB, coding tree block)，相应的两个色度CTBs和语法元素组成。一个LxL大小的亮度CTU可以是L=16，32，或者64采样；一般而言，大的CTU有利于提高压缩性能。HEVC支持CTBs通过树结构分割成更小的块和像四叉树的信号。

2） 编码单元（CU,coding units）和编码块（CB, coding block）

CTU的四叉树语言结构指定了它亮度和色度CTBs的大小和位置。

四叉树的根部在CTU。因此，一个亮度CB最大为一个CTB。一个CTU分割成多个亮度和色度CTBs有分割信号控制。一个CU由一个亮度CB，两个相应的色度CBs和语法元素组成。一个CTB可能只含有一个CU，或者分割成多个CUs，并且每个CU有一个相应的分割的多个预测单元(PUs, prediction units)和一个树变换单元(TUs, transform units)。

3） 预测单元(PUs,prediction units)和预测块(PBs,prediction blocks)

在CU级决定一个编码一个图像区域用帧间预测还是帧内预测。一个PU分割结构的根部在CU级。依据基本的预测类型选择，亮度和色度的CBs可以进一步分割大小，这些分割子块通过亮度和色度PBs进行预测。HEVC支持的PB大小从64x64到4x4。

4） 变换单元(TUs,transform units)和变换块(TBs, transform blocks)

预测残差通过块变换进行编码。一个TU树结构的根部在CU级。亮度CB残差可能和亮度变换块TB一样，或者进一步分割成多个亮度TBs。色度TBs也是一样的。定义了一个类似离散余弦变换(DCT, discrete cosine transform)的整数基函数用于正方形TB块，如4x4，8x8，16x16和32x32。对于4x4的亮度帧内预测残差块，定义了一个源于离散正弦变换(DST, discrete sine transform)的整数变换。

5） 运动矢量信号

使用了一个先进的运动矢量预测（AMVP, advanced motion vector prediction），它包含基于相邻PBs和参考帧数据的最可能候选模式。同时，使用一个针对MV编码的融合模式，它允许从时域或空域相邻PBs继承MVs。而且，和H.264/MPEG-4AVC相比，还定义了改善的skip的和直接运动推断。

6） 运动补偿（MC,motion compensation）

MVs采用1/4采样精度，7抽头和8抽头的滤波器用于分数采样内插。（和H.264/MPEG-4 AVC相比，H.264/MPEG-4 AVC采用6抽头滤波器用于1/2像素位置采样，然后通过线性内插的1/4位置采样）。和H.264/MPEG-4AVC相似，HEVC采用了多参考帧。对于每一个PB，传输一个或者两个运动矢量，将相应导致单向预测或者双向预测编码。像H.264/MPEG-4 AVC一样，HEVC采用一个扩充和偏移操作来实现权重预测。

7） 帧内预测（Intrapictureprediction）

在帧间预测不能实现的图像区域，相邻块的已编码边界采样点用作空域预测的参考数据。帧内预测支持33种方向模式（H.264/MPEG-4AVC支持8种这样模式），一种平面模式和一种DC预测模式。选择的帧内预测模式通过基于之前相邻以解码的PBs的最可能模式（MPM,most probable prediction modes）之一进行编码。

8） 量化控制

和H.264/MPEG-4AVC中一样，HEVC采用一种统一的重建量化机制，同时针对不同大小的TB伸缩量化矩阵。

9） 熵编码

HEVC采用基于内容自适应的二进制算术编码（CABAC, context adaptive binary arithmeticcoding）进行熵编码。这个和H.264/MPEG-4 AVC中的CABAC很相似，但是做了一些改进以提高它的处理速度和压缩性能，并减少它的内容内存存储要求。

10） 内部环路去块滤波器

HEVC在帧间预测循环中，采用一个类似H.264/MPEG-4 AVC用的去块滤波器。然而，这种滤波器针对决策机制和滤波处理过程设计的简单些，并且能很好的用于并行处理之中。

11） 采样自适应偏移（SAO,sample adaptive offset）

HEVC在帧间预测循环的去块滤波后，引入了一个非线性的幅度映射。它的目的是用查表的方法更好的重建原来信号的幅度。这个查表同个一些在编码端通过直方图分析获得的额外参数进行设置。（注：转载请注明出处，谢谢）