# Matlab常见变量和函数

```
    1、特殊变量与常数
    ans  计算结果的变量名

    computer  确定运行的计算机
    eps  浮点相对精度

    Inf  无穷大
    I  虚数单位

    inputname  输入参数名
    NaN  非数

    nargin  输入参数个数
    nargout  输出参数的数目

    pi  圆周率
    nargoutchk  有效的输出参数数目

    realmax  最大正浮点数
    realmin  最小正浮点数

    varargin  实际输入 的参量
    varargout  实际返回的参量
    操作符与特殊字符
    +  加  -  减
    *  矩阵乘法  .*  数组乘（对应元素相乘）
    ^  矩阵幂  .^  数组幂（各个元素求幂）
    \  左除或反斜杠  /  右除或斜面杠
    ./  数组除（对应元素除）

    kron  Kronecker张量积
    :  冒号  ()  圆括
    []  方括  .  小数点
    ..  父目录  ...  继续
    ,  逗号（分割多条命令）  ;  分号（禁止结果显示）
    %  注释  !  感叹号
    '  转置或引用  =  赋值
    ==  相等  <>  不等于
    &  逻辑与  |  逻辑或
    ~  逻辑非  xor  逻辑异或

    2、基本数学函数
    abs  绝对值和复数模长

    acos,acodh  反余弦，反双曲余弦
    acot,acoth  反余切，反双曲余切

    acsc,acsch  反余割，反双曲余割
    angle  相角

    asec,asech  反正割，反双曲正割
    secant  正切

    asin,asinh  反正弦，反双曲正弦
    atan,atanh  反正切，双曲正切

    tangent  正切
    atan2  四象限反正切

    ceil  向着无穷大舍入
    complex  建立一个复数

    conj  复数配对
    cos,cosh  余弦，双曲余弦

    csc,csch  余切，双曲余切
    cot,coth  余切，双曲余切

    exp  指数
    fix  朝0方向取整

    floor  朝负无穷取整
    gcd  最大公因数

    imag  复数值的虚部
    lcm  最小公倍数

    log  自然对数
    log2  以2为底的对数

    log10  常用对数
    mod  有符号的求余

    nchoosek  二项式系数和全部组合数
    real  复数的实部

    rem  相除后求余
    round  取整为最近的整数

    sec,sech  正割，双曲正割
    sign  符号数

    sin,sinh  正弦，双曲正弦
    sqrt  平方根

    tan,tanh  正切，双曲正切

    3、基本矩阵和矩阵操作
    blkding  从输入参量建立块对角矩阵

    eye  单位矩阵
    linespace  产生线性间隔的向量

    logspace  产生对数间隔的向量
    numel  元素个数

    ones  产生全为1的数组
    rand  均匀颁随机数和数组

    randn  正态分布随机数和数组
    zeros  建立一个全0矩阵  colon)  等间隔向量
    cat  连接数组

    diag  对角矩阵和矩阵对角线
    fliplr  从左自右翻转矩阵

    flipud  从上到下翻转矩阵
    repmat  复制一个数组

    reshape  改造矩阵
    roy90  矩阵翻转90度

    tril  矩阵的下三角
    triu  矩阵的上三角

    dot  向量点集
    cross  向量叉集

    ismember  检测一个集合的元素
    intersect  向量的交集

    setxor  向量异或集
    setdiff  向是的差集

    union  向量的并集
    数值分析和傅立叶变换
    cumprod  累积

    cumsum  累加
    cumtrapz  累计梯形法计算数值微分

    factor  质因子
    inpolygon  删除多边形区域内的点

    max  最大值
    mean  数组的均值

    mediam  中值
    min  最小值

    perms  所有可能的转换
    polyarea  多边形区域

    primes  生成质数列表
    prod  数组元素的乘积

    rectint  矩形交集区域
    sort  按升序排列矩阵元素

    sortrows  按升序排列行
    std  标准偏差

    sum  求和
    trapz  梯形数值积分

    var  方差
    del2  离散拉普拉斯

    diff  差值和微分估计
    gradient  数值梯度

    cov  协方差矩阵
    corrcoef  相关系数

    conv2  二维卷积
    conv  卷积和多项式乘法

    filter  IIR或FIR滤波器
    deconv  反卷积和多项式除法

    filter2  二维数字滤波器
    cplxpair  将复数值分类为共轭对

    fft  一维的快速傅立叶变换
    fft2  二维快速傅立叶变换

    fftshift  将FFT的DC分量移到频谱中心
    ifft  一维快速反傅立叶变换

    ifft2  二维傅立叶反变换
    ifftn  多维快速傅立叶变换

    ifftshift  反FFT偏移
    nextpow2  最靠近的2的幂次

    unwrap  校正相位角

    多项式与插值
    conv  卷积和多项式乘法

    roots  多项式的根
    poly  具有设定根的多项式

    polyder  多项式微分
    polyeig  多项式的特征根

    polyfit  多项式拟合
    polyint  解析多项式积分

    polyval  多项式求值
    polyvalm  矩阵变量多项式求值

    residue  部分分式展开
    interp1  一维插值

    interp2  二维插值
    interp3  三维插值

    interpft  使用FFT的一维插值
    interpn  多维插值

    meshgrid  为3维点生成x和y的网格
    ndgrid  生成多维函数和插值的数组

    pchip  分段3次Hermite插值多项式
    ppval  分段多项式的值

    spline  3次样条数据插值

    绘图函数
    bar  竖直条图

    barh  水平条图
    hist  直方图

    histc  直方图计数
    hold  保持当前图形

    loglog  x,y对数坐标图
    pie  饼状图

    plot  绘二维图
    polar  极坐标图

    semilogy  y轴对数坐标图
    semilogx  x轴对数坐标

    subplot  绘制子图
    bar3  数值3D竖条图

    bar3h  水平3D条形图
    comet3  3D慧星图

    cylinder  圆柱体
    fill3  填充的3D多边形

    plot3  3维空间绘图
    quiver3  3D震动（速度）图

    slice  体积薄片图
    sphere  球

    stem3  绘制离散表面数据
    waterfall  绘制瀑布

    trisurf  三角表面
    clabel  增加轮廓标签到等高线图中

    datetick  数据格式标记
    grid  加网格线

    gtext  用鼠标将文本放在2D图中
    legend  图注

    plotyy  左右边都绘Y轴
    title  标题

    xlabel  X轴标签
    ylabel  Y轴标签

    zlabel  Z轴标签
    contour  等高线图

    contourc  等高线计算
    contourf  填充的等高线图

    hidden  网格线消影
    meshc  连接网格/等高线

    mesh  具有参考轴的3D网格
    peaks  具有两个变量的采样函数

    surf  3D阴影表面图
    surface  建立表面低层对象

    surfc  海浪和等高线的结合
    surfl  具有光照的3D阴影表面

    trimesh  三角网格图
```
