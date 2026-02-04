# opencv-图像轮廓用长方形和圆圈显示




```cpp
    #include "opencv2/highgui/highgui.hpp"
    #include "opencv2/imgproc/imgproc.hpp"
    #include <iostream>
    #include <stdio.h>
    #include <stdlib.h>

    using namespace cv;
    using namespace std;

    Mat src; Mat src_gray;
    int thresh = 100;
    int max_thresh = 255;
    RNG rng(12345);

    //函数声明
    void thresh_callback(int, void* );

    int main( int argc, char** argv )
    {
      //加载彩色图像并转换为灰度图
      src = imread( argv[1], 1 );

      //转换灰度图并模糊
      cvtColor( src, src_gray, CV_BGR2GRAY );
      blur( src_gray, src_gray, Size(3,3) );

      //创建显示窗口
      char* source_window = "Source";
      namedWindow( source_window, CV_WINDOW_AUTOSIZE );
      imshow( source_window, src );

      createTrackbar( " Threshold:", "Source", &thresh, max_thresh, thresh_callback );
      thresh_callback( 0, 0 );

      waitKey(0);
      return(0);
    }


    void thresh_callback(int, void* )
    {
      Mat threshold_output;
      vector<vector<Point> > contours;
      vector<Vec4i> hierarchy;

      //阈值检测边界
      threshold( src_gray, threshold_output, thresh, 255, THRESH_BINARY );
      //查找轮廓
      findContours( threshold_output, contours, hierarchy, CV_RETR_TREE, CV_CHAIN_APPROX_SIMPLE, Point(0, 0) );

      //近似轮廓多边形，过的方形和圆圈
      vector<vector<Point> > contours_poly( contours.size() );
      vector<Rect> boundRect( contours.size() );
      vector<Point2f>center( contours.size() );
      vector<float>radius( contours.size() );

      for( int i = 0; i < contours.size(); i++ )
         { approxPolyDP( Mat(contours[i]), contours_poly[i], 3, true );
           boundRect[i] = boundingRect( Mat(contours_poly[i]) );
           minEnclosingCircle( contours_poly[i], center[i], radius[i] );
         }


      //用方形和圆圈画多边形边界
      Mat drawing = Mat::zeros( threshold_output.size(), CV_8UC3 );
      for( int i = 0; i< contours.size(); i++ )
         {
           Scalar color = Scalar( rng.uniform(0, 255), rng.uniform(0,255), rng.uniform(0,255) );
           drawContours( drawing, contours_poly, i, color, 1, 8, vector<Vec4i>(), 0, Point() );
           rectangle( drawing, boundRect[i].tl(), boundRect[i].br(), color, 2, 8, 0 );
           circle( drawing, center[i], (int)radius[i], color, 2, 8, 0 );
         }

      /// Show in a window
      namedWindow( "Contours", CV_WINDOW_AUTOSIZE );
      imshow( "Contours", drawing );
    }
```



  


![](../assets/images/cc57d10dab7170af.jpg)  


  


![](../assets/images/1e7ddc877b4b0f4c.jpg)  


  


![](../assets/images/03b12c7d4b2e1ddf.jpg)  


  
```