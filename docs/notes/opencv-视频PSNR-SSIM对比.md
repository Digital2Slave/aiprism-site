# opencv-视频PSNR SSIM对比




```cpp
    #include <iostream>    // for standard I/O
    #include <string>   // for strings
    #include <iomanip>  // for controlling float print precision
    #include <sstream>  // string to number conversion

    #include <opencv2/imgproc/imgproc.hpp>  // Gaussian Blur
    #include <opencv2/core/core.hpp>        // Basic OpenCV structures (cv::Mat, Scalar)
    #include <opencv2/highgui/highgui.hpp>  // OpenCV window I/O
    #include <fstream>//输出结果到文本中
    //命名空间
    using namespace std;
    using namespace cv;

    //调用函数声明
    double getPSNR ( const Mat& I1, const Mat& I2);
    Scalar getMSSIM( const Mat& I1, const Mat& I2);

    void help()
    {
        cout
            << "\n--------------------------------------------------------------------------" << endl
            << "This program shows how to read a video file with OpenCV. In addition, it tests the"
            << " similarity of two input videos first with PSNR, and for the frames below a PSNR "  << endl
            << "trigger value, also with MSSIM."<< endl
            << "Usage:"                                                                       << endl
            << "./video-source referenceVideo useCaseTestVideo PSNR_Trigger_Value Wait_Between_Frames " << endl
            << "--------------------------------------------------------------------------"   << endl
            << endl;
    }
    int main(int argc, char *argv[], char *window_name)
    {
        help();
        if (argc != 5)
        {
            cout << "Not enough parameters" << endl;
            return -1;
        }
        stringstream conv;

        const string sourceReference = argv[1],sourceCompareWith = argv[2];
        int psnrTriggerValue, delay;
        conv << argv[3] << endl << argv[4];    //put 35 10 in the strings
        conv >> psnrTriggerValue >> delay;  //take out the numbers 35 10

        char c;
        int frameNum = -1;// Frame counter

        //获取原视频和参考视频
        VideoCapture captRefrnc(sourceReference),
            captUndTst(sourceCompareWith);
        //判断是否获取视频操作成功
        if ( !captRefrnc.isOpened())
        {
            cout  << "Could not open reference " << sourceReference << endl;
            return -1;
        }
        if( !captUndTst.isOpened())
        {
            cout  << "Could not open case test " << sourceCompareWith << endl;
            return -1;
        }

        //获取两个输入视频的宽度和高度
        Size refS = Size((int) captRefrnc.get(CV_CAP_PROP_FRAME_WIDTH),
            (int) captRefrnc.get(CV_CAP_PROP_FRAME_HEIGHT)),
            uTSi = Size((int) captUndTst.get(CV_CAP_PROP_FRAME_WIDTH),
            (int) captUndTst.get(CV_CAP_PROP_FRAME_HEIGHT));

        //判断两个对比视频大小是否一样
        if (refS != uTSi)
        {
            cout << "Inputs have different size!!! Closing." << endl;
            return -1;
        }
        //为创建窗口命名
        const char* WIN_UT = "Under Test";
        const char* WIN_RF = "Reference";

        //创建显示窗口
        namedWindow(WIN_RF, CV_WINDOW_AUTOSIZE );
        namedWindow(WIN_UT, CV_WINDOW_AUTOSIZE );
        cvMoveWindow(WIN_RF, 400       ,            0);    //750,  2 (bernat =0)
        cvMoveWindow(WIN_UT, refS.width,            0);    //1500, 2

        //cout << "Reference frame resolution: Width=" << refS.width << "  Height=" << refS.height
        //    << " of nr#: " << captRefrnc.get(CV_CAP_PROP_FRAME_COUNT) << endl;

        //cout << "PSNR trigger value " <<
        //    setiosflags(ios::fixed) << setprecision(3) << psnrTriggerValue << endl;

    //------------------------201348修改---------------------------------------------------
        ofstream outfile("VideoComparison.txt",ios::in|ios::app);
        outfile<< "Reference frame resolution: "<<endl;
        outfile<<"Width=" << refS.width << "  Height=" << refS.height
               << " Frames=: " << captRefrnc.get(CV_CAP_PROP_FRAME_COUNT) << endl;
        outfile<<endl;

        outfile << "PSNR trigger value " <<setiosflags(ios::fixed) << setprecision(3)
               << psnrTriggerValue << endl;
        outfile<<endl;
    //------------------------201348修改---------------------------------------------------

        Mat frameReference, frameUnderTest;
        double psnrV;
        Scalar mssimV;

        while( true) //Show the image captured in the window and repeat
        {
            captRefrnc >> frameReference;
            captUndTst >> frameUnderTest;
            //判断视频内容为空
            if( frameReference.empty()  || frameUnderTest.empty())
            {
                cout << " < < <  Game over!  > > > ";
                outfile<< " < < <  It's done!!!  > > > ";//201348修改
                break;
            }

            ++frameNum;
           // cout <<"Frame:" << frameNum <<"# ";


    //------------------------201348修改---------------------------------------------------
           outfile<<"Frame:"<< frameNum <<"#"<<'\t';
    //------------------------201348修改---------------------------------------------------


            ///////////////////////////////// PSNR ////////////////////////////////////////////////////
            psnrV = getPSNR(frameReference,frameUnderTest);    //get PSNR
            //cout << setiosflags(ios::fixed) << setprecision(3) << psnrV << "dB";

    //------------------------201348修改---------------------------------------------------
            outfile << setiosflags(ios::fixed) << setprecision(3) <<"PSNR:"<< psnrV <<"dB";
    //------------------------201348修改---------------------------------------------------



            //////////////////////////////////// MSSIM /////////////////////////////////////////////////
            //if (psnrV < psnrTriggerValue && psnrV)
            //{
            //    mssimV = getMSSIM(frameReference,frameUnderTest);

            //    cout << " MSSIM: "
            //        << " R " << setiosflags(ios::fixed) << setprecision(2) << mssimV.val[2] * 100 << "%"
            //        << " G " << setiosflags(ios::fixed) << setprecision(2) << mssimV.val[1] * 100 << "%"
            //        << " B " << setiosflags(ios::fixed) << setprecision(2) << mssimV.val[0] * 100 << "%";
            //}

            //cout << endl;
    //------------------------201348修改---------------------------------------------------
            if (psnrV < psnrTriggerValue && psnrV)
            {
                mssimV = getMSSIM(frameReference,frameUnderTest);
                outfile <<'\t' <<" MSSIM: "
                    << " R " << setiosflags(ios::fixed) << setprecision(2) << mssimV.val[2] * 100 << "%"
                    << " G " << setiosflags(ios::fixed) << setprecision(2) << mssimV.val[1] * 100 << "%"
                    << " B " << setiosflags(ios::fixed) << setprecision(2) << mssimV.val[0] * 100 << "%";
            }
            outfile << endl;
    //------------------------201348修改---------------------------------------------------

            ////////////////////////////////// Show Image /////////////////////////////////////////////
            imshow( WIN_RF, frameReference);
            imshow( WIN_UT, frameUnderTest);

            c = cvWaitKey(delay);
            if (c == 27) break;
        }

        return 0;
    }

    double getPSNR(const Mat& I1, const Mat& I2)
    {
        Mat s1;
        absdiff(I1, I2, s1);       // |I1 - I2|
        s1.convertTo(s1, CV_32F);  // cannot make a square on 8 bits
        s1 = s1.mul(s1);           // |I1 - I2|^2

        Scalar s = sum(s1);         // sum elements per channel

        double sse = s.val[0] + s.val[1] + s.val[2]; // sum channels

        if( sse <= 1e-10) // for small values return zero
            return 0;
        else
        {
            double  mse =sse /(double)(I1.channels() * I1.total());
            double psnr = 10.0*log10((255*255)/mse);
            return psnr;
        }
    }

    Scalar getMSSIM( const Mat& i1, const Mat& i2)
    {
        const double C1 = 6.5025, C2 = 58.5225;
        /***************************** INITS **********************************/
        int d     = CV_32F;

        Mat I1, I2;
        i1.convertTo(I1, d);           // cannot calculate on one byte large values
        i2.convertTo(I2, d);

        Mat I2_2   = I2.mul(I2);        // I2^2
        Mat I1_2   = I1.mul(I1);        // I1^2
        Mat I1_I2  = I1.mul(I2);        // I1 * I2

        /*************************** END INITS **********************************/

        Mat mu1, mu2;   // PRELIMINARY COMPUTING
        GaussianBlur(I1, mu1, Size(11, 11), 1.5);
        GaussianBlur(I2, mu2, Size(11, 11), 1.5);

        Mat mu1_2   =   mu1.mul(mu1);
        Mat mu2_2   =   mu2.mul(mu2);
        Mat mu1_mu2 =   mu1.mul(mu2);

        Mat sigma1_2, sigma2_2, sigma12;

        GaussianBlur(I1_2, sigma1_2, Size(11, 11), 1.5);
        sigma1_2 -= mu1_2;

        GaussianBlur(I2_2, sigma2_2, Size(11, 11), 1.5);
        sigma2_2 -= mu2_2;

        GaussianBlur(I1_I2, sigma12, Size(11, 11), 1.5);
        sigma12 -= mu1_mu2;

        ///////////////////////////////// FORMULA ////////////////////////////////
        Mat t1, t2, t3;

        t1 = 2 * mu1_mu2 + C1;
        t2 = 2 * sigma12 + C2;
        t3 = t1.mul(t2);              // t3 = ((2*mu1_mu2 + C1).*(2*sigma12 + C2))

        t1 = mu1_2 + mu2_2 + C1;
        t2 = sigma1_2 + sigma2_2 + C2;
        t1 = t1.mul(t2);               // t1 =((mu1_2 + mu2_2 + C1).*(sigma1_2 + sigma2_2 + C2))

        Mat ssim_map;
        divide(t3, t1, ssim_map);      // ssim_map =  t3./t1;

        Scalar mssim = mean( ssim_map ); // mssim = average of ssim map
        return mssim;
    }
```



  


备注：输出文本是工作目录下面的VideoComparison.txt。如我的工作目录为C:\Users\iceman\Documents\Visual Studio 2008\Projects\opencv\opencv

如图两个视频文件为AVI格式的，其他格式的视频暂时没有处理。大家可以尝试着处理一下，分享一下。

本文的相关算法内容，可以参考其他文献，因为这里我主要是用opencv作为一个处理的工具使用的。O(∩_∩)O~

<!-- image skipped: https://img-my.csdn.net/uploads/201304/08/1365420605_5489.jpg --> ![](https://img-my.csdn.net/uploads/201304/08/1365420605_5489.jpg)  


<!-- image skipped: https://img-my.csdn.net/uploads/201304/08/1365420613_5732.jpg --> ![](https://img-my.csdn.net/uploads/201304/08/1365420613_5732.jpg)  


  


<!-- image skipped: https://img-my.csdn.net/uploads/201304/08/1365420619_1237.jpg --> ![](https://img-my.csdn.net/uploads/201304/08/1365420619_1237.jpg)  


  


<!-- image skipped: https://img-my.csdn.net/uploads/201304/08/1365420623_8643.jpg --> ![](https://img-my.csdn.net/uploads/201304/08/1365420623_8643.jpg)  


  


<!-- image skipped: https://img-my.csdn.net/uploads/201304/08/1365420635_5904.jpg --> ![](https://img-my.csdn.net/uploads/201304/08/1365420635_5904.jpg)  


  
```