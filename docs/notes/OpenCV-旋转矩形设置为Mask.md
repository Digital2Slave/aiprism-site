# OpenCV 旋转矩形设置为Mask

利用OpenCV实现图像中旋转矩形区域设置为Mask掩膜。实现函数如下所示：


```cpp
    void setPixelValueByContours(CvRect& bndRect, CvSeq*& contour, IplImage*& dst)
    {
        int rectx = bndRect.x;
        int recty = bndRect.y;
        int rectw = rectx + bndRect.width;
        int recth = recty + bndRect.height;
        // std::cout << recty << "\t" << recth << "\t" << rectx << "\t" << rectw << std::endl;
        CvPoint2D32f pt;
        CvScalar sv;
        sv.val[0] = 255;
        sv.val[1] = 255;
        sv.val[2] = 255;
        for (int j = recty; j < recth; ++j)
        {
            for (int i = rectx; i < rectw; ++i)
            {
                pt.y = j;
                pt.x = i;
                double ptestv = cvPointPolygonTest(contour, pt, false);
                if ( ptestv >= 0.0)
                {// in: >0  out: <0  on: ==0
                    cvSet2D(dst, j, i, sv);
                }
            }
        }
    }
```



### 参考

[cvPointPolygonTest](https://docs.opencv.org/2.4.13.5/modules/imgproc/doc/structural_analysis_and_shape_descriptors.html?highlight=cvpointpolygontest)
```