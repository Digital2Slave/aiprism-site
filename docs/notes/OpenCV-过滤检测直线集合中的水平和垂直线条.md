# OpenCV 过滤检测直线集合中的水平和垂直线条

功能需求：计算图像中的直线，并过滤掉水平和垂直的直线。

### 源码


```cpp
    #include <iostream>
    #include <vector>
    #include <string>

    #include "opencv2/core/core.hpp"
    #include "opencv2/imgproc/imgproc.hpp"
    #include "opencv2/highgui/highgui.hpp"

    void findLines(cv::Mat& binary)
    {
        std::vector<cv::Vec4i> tmp_lines;
        HoughLinesP(
            binary,
            tmp_lines,
            1,
            3.1415926 / 180,
            5,
            0.0,
            0.0
        );
        std::vector<cv::Vec4i>::const_iterator itr = tmp_lines.begin();
        cv::Point pt1, pt2;
        for (; itr != tmp_lines.end(); ++itr)
        {
            pt1.x = (*itr)[0];
            pt1.y = (*itr)[1];
            pt2.x = (*itr)[2];
            pt2.y = (*itr)[3];
            float angle = atan2(pt1.y - pt2.y, pt1.x - pt2.x);
            angle *= 57.19577951; // 180 / CV_PI
            std::cout << angle << '\n';
            //水平方向0°/180°/-180°/360°
            bool b_hline = (angle >= -1 && angle <= 1) || (angle >= 359 && angle <= 361) || (angle >= 179 && angle <= 181) || (angle >= -181 && angle <= -179)
            //竖直方向90°/-90°/270°/-270°
            bool b_vline = (angle >= 89 && angle <= 91) || (angle >= -91 && angle <= -89) || (angle >= 269 && angle <= 271) || (angle >= -271 && angle <= -269)
            if (b_hline || b_vline)
            {
                cv::LineIterator lit(binary, pt1, pt2, 8);
                for (int i = 0; i < lit.count; i++, ++lit)
                {
                    cv::Point pt(lit.pos());
                    //int val = binary.at<uchar>(pt.y, pt.x);
                    //std::cout << pt.y << "," << pt.x << "-->" << val << std::endl;
                    binary.at<uchar>(pt.y, pt.x) = 0;
                }
                continue;
            }
        }
    }

    int main(int argc, char* argv[])
    {
        cv::Mat img = cv::imread("D:/test.jpg", 0);
        cv::Mat edges;
        cv::Canny(img, edges, 30, 75);
        cv::imwrite("D:/edges.jpg", edges);
        findLines(edges);
        cv::imwrite("D:/res.jpg", edges);
        return 0;
    }
```



### 参考

  1. [houghlinesp](http://docs.opencv.org/2.4/modules/imgproc/doc/feature_detection.html?highlight=houghlinesp#houghlinesp)
  2. [lineiterator](http://docs.opencv.org/2.4/modules/core/doc/drawing_functions.html#lineiterator)
  3. [HoughLinesP参数设置（看完还不会你砍死我！！！）](https://blog.csdn.net/Li_haiyu/article/details/106397532)

```