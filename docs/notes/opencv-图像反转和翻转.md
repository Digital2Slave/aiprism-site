# opencv-图像反转和翻转

/*
Name : ImageReverseAndRollover.cpp  
Function: 读入bmp图像文件，进行图像反转和翻转，并在屏幕上显示  
*/
/*========================================OpenCV实现图像翻转=====================================
参考http://hi.baidu.com/cateyefish/item/60167fcddfe8a52ce80f2e2a进行修改  
cvFlip函数  
垂直，水平，垂直同时水平翻转二维数组三种功能  
  
void cvFlip( const CvArr* src, CvArr* dst=NULL, int flip_mode=0);
  
src: 原数组; dst: 目标数组, 当dst = NULL 时，实现内部替换   
  


flip_mode 指定数组翻转模式

flip_mode = 0 ：沿X轴翻转  
flip_mode > 0 ： 沿Y轴翻转   
flip_mode < 0 ： 沿X轴和Y轴翻转  
  
函数cvFlip以三种方式之一翻转数组 (行和列下标是以0为基点的):  
dst(i,j)=src(rows(src)-i-1,j) if flip_mode = 0  
dst(i,j)=src(i,cols(src1)-j-1) if flip_mode > 0  
dst(i,j)=src(rows(src)-i-1,cols(src)-j-1) if flip_mode < 0  


  


函数主要使用在:

垂直翻转图像(flip_mode > 0)，用于顶-左和底-左图像结构的转换, 主要用于WIN32系统下的视频操作处理.   
水平图像转换(flip_mode = 0)，使用连续的水平转换和绝对值差检查垂直轴对称  
水平和垂直同时转换(flip_mode < 0)，用于连续的水平转换和绝对真理值差检查中心对称   
翻转1维指针数组的顺序(flip_mode > 0)   
*/



```cpp
    #include <iostream>
    #include <opencv2/core/core.hpp>
    #include <opencv2/imgproc/imgproc.hpp>
    #include <opencv2/highgui/highgui.hpp>
    using namespace std;
    using namespace cv;
    int main()
    {
    IplImage *pSrcImg = NULL;
    IplImage *pRolloverlnImg = NULL;
    IplImage *pRoverselnImg = NULL;

    pSrcImg = cvLoadImage("D:\lena.bmp",0);
    //cvLoadImage( filename, -1 ); 默认读取图像的原通道数
    //cvLoadImage( filename, 0 ); 强制转化读取图像为灰度图
    //cvLoadImage( filename, 1 ); 读取彩色图
    if (pSrcImg == NULL)
    {
    cout <<"Fail to load image"<<endl;
    return -1;
    }

    pRolloverlnImg = cvCloneImage(pSrcImg);
    pRoverselnImg  = cvCloneImage(pSrcImg);


    if ((pRolloverlnImg == NULL)&&(pRoverselnImg == NULL))
    {
    cout<<"Fail to clone the image"<<endl;
    return -1;
    }

    //-------------------------------------图像翻转处理-------------------------------


    cvFlip(pRolloverlnImg, NULL,0);    //载入图像绕x轴上下翻转


    //--------------------------------------图像反转处理------------------------------
    int length,width,step,channel;
    uchar *data;
    int i,j,k;

    length=pRoverselnImg->height;
    width=pRoverselnImg->width;
    step=pRoverselnImg->widthStep;
    channel=pRoverselnImg->nChannels;
    data=(uchar *)pRoverselnImg->imageData;

    for (i=0;i<length;i++)
    {
    for (j=0;j<width;j++)
    {
    for (k=0;k<channel;k++)
    {
    data[i*step+j*channel+k]=255-data[i*step+j*channel+k];
    }
    }
    }
    //*****************************************************************************************


    //cvNamedWindow("src",0);      //0表示以固定的窗口尺寸显示图像,不输入任何值默认和原图大小一样
    cvNamedWindow(     "src"     );
    cvNamedWindow(  "Xturnover"  );
        cvNamedWindow(  "Picreverse" );

    cvShowImage("src", pSrcImg);
    cvShowImage("Xturnover", pRolloverlnImg);
    cvShowImage("Picreverse",pRoverselnImg );

    cvWaitKey(0);

    cvReleaseImage(&pSrcImg);
    cvReleaseImage(&pRolloverlnImg);
    cvReleaseImage(&pRoverselnImg);

    cvDestroyWindow("src");
    cvDestroyWindow("Xturnover");
    cvDestroyWindow("Picreverse");
    return 0;
    }
```



  
  
```