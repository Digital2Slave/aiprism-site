# opencv 遍历文件夹里面图像--实现

思路来自http://blog.csdn.net/watkinsong/article/details/9227439，后来，我自己用VS2012+Opencv2.4.8实现了一下，只是没有显示图像。后来，稍微修改了一下，可以显示图像喽，这样就可以批处理指定目录文件夹里面的图像了。

1.head.h头文件


```
    #ifndef _HEAD_H_
    #define _HEAD_H_

    //OpencvDirTraverse.cpp : Defines the entry point for the console application.
    #define _CRT_SECURE_NO_DEPRECATE

    #include <cstdio>
    #include <vector>
    #include <iostream>
    #include <fstream>
    #include <cstring>
    #include <cstdlib>
    #include <cmath>
    #include <algorithm>

    #include "opencv\cv.h"
    #include "opencv2\core\core.hpp"
    #include "opencv2\highgui\highgui.hpp"
    #include "opencv2\imgproc\imgproc.hpp"
    #include "opencv2\contrib\contrib.hpp"

    using namespace std;
    using namespace cv;

    #endif // !_HEAD_H_
```



  


2.main.cpp源文件 


```cpp
    #include "head.h"

    int main(int argc, char * argv[])
    {
        string dir_path = "D:/Test/";
        Directory dir;
        vector<string> fileNames = dir.GetListFiles(dir_path, "*.jpg", false);

        for(int i = 0; i < fileNames.size(); i++)
        {
            string fileName = fileNames[i];
            string fileFullName = dir_path + fileName;
            cout<<"file name:"<<fileName<<endl;
            cout<<"file paht:"<<fileFullName<<endl<<endl;

            //Image processing
            Mat pScr;
            pScr=imread(fileFullName,1); //以文件名命名窗口
            imshow(fileName,pScr);
            waitKey(1000);


        }

        //system("pause");
        return EXIT_SUCCESS;
    }
```



  
  
  
```