# opencv 遍历指定路径下所有文件的内容




```cpp
    #include "head.h"

    int main(int argc, char * argv[])
    {
        string dir_path = "D:/TEST/";

        Directory dir;
        vector<string> Folders = dir.GetListFolders(dir_path, "*", false);// 获取指定路径下所有子文件夹的名称

        Directory dirs;
        for (size_t i = 0; i < Folders.size(); ++i)
        {
            vector<string> fileNames = dirs.GetListFiles(dir_path + Folders.at(i) + "/", "*", false);// 获取所有子文件夹内文件名称

            for (size_t j = 0; j < fileNames.size(); ++j)
            {
                string fileName = fileNames[j];
                string fileFullName = dir_path + Folders.at(i) + "/" + fileName;// 获取文件的绝对路径
                cout<<"file name:"<<fileName<<endl;
                cout<<"file path:"<<fileFullName<<endl<<endl;

                // !文件夹内的文件处理
                Mat pScr;
                pScr = imread(fileFullName,1); //以文件名命名窗口
                //imshow(fileName,pScr);
                //waitKey(1000);

                string str = "pro_";
                str = dir_path + str + fileName;
                // !写出处理结果文件
                imwrite(str, pScr);

            }
        }
        return EXIT_SUCCESS;
    }
```



  



```
    #ifndef _HEAD_H_
    #define _HEAD_H_

    //OpencvDirTraverse.cpp : Defines the entry point for the console application.
    #define _CRT_SECURE_NO_DEPRECATE

    #include <stdio.h>
    #include <vector>
    #include <iostream>
    #include <string>
    #include <stdlib.h>
    #include <math.h>
    #include <algorithm>

    #include "opencv2\core\core.hpp"
    #include "opencv2\highgui\highgui.hpp"
    #include "opencv2\imgproc\imgproc.hpp"
    #include "opencv2\contrib\contrib.hpp"


    using namespace std;
    using namespace cv;

    #endif // !< _HEAD_H_
```



  
  
```