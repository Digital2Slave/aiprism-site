# MFC删除文件夹

目前做的图像识别项目需要，对指定文件夹内子文件夹进行定期清理删除工作。由于之前没有用过MFC，就在网上搜到了一个删除文件夹的代码，如下所示：


```
    void DeleteDirectory(CString strDir)
    {
     if(strDir.IsEmpty())
     {
      RemoveDirectory(strDir);
      return;
     }

     //首先删除文件及子文件夹
     CFileFind   ff;
     BOOL bFound = ff.FindFile(strDir+ _T("\\*"),0);

     while(bFound)
     {
      bFound = ff.FindNextFile();
      if(ff.GetFileName()== _T(".")||ff.GetFileName()== _T(".."))
       continue;

      //去掉文件(夹)只读等属性
      SetFileAttributes(ff.GetFilePath(),FILE_ATTRIBUTE_NORMAL);

      if(ff.IsDirectory())
      {
       //递归删除子文件夹
       DeleteDirectory(ff.GetFilePath());
       RemoveDirectory(ff.GetFilePath());
      }
      else
      {
       DeleteFile(ff.GetFilePath());   //删除文件
      }
     }
     ff.Close();
     //然后删除该文件夹
     RemoveDirectory(strDir);
    }
```



然后，我像往常一样，开开心心去调试运行生成的执行文件。结果，杯具了。我的**D盘** 除了正在运行的程序，其他文件夹全部删除了！ 台式电脑不敢停机，网上各种搜索修复数据软件，All useless! 

好在每天下班前自己都会把代码提交到**gerrit** 代码审核平台；没有什么太大的损失，只是测试图像要重新积累；以前写的Python脚本，可能要重新造轮子了，特别是网络爬虫和BP神经网络模型参数数据处理的部分。

**代码调试需谨慎，数据备份要频繁！**

今天上午，终于看到比较靠谱的实现代码，根据自己的业务需求，进行调整，终于测试通过 :)！   
记录如下：


```
    /*判断一个路径是否是已存在的目录*/
    BOOL IsDirectory(LPCTSTR pstrPath)
    {
        if (NULL == pstrPath)
        {
            return FALSE;
        }

        /*去除路径末尾的反斜杠*/
        CString strPath = pstrPath;
        if (strPath.Right(1) == _T('\\'))
        {
            strPath.Delete(strPath.GetLength()-1);
        }

        CFileFind finder;
        BOOL bRet = finder.FindFile(strPath);
        if (!bRet)
        {
            return FALSE;
        }

        /*判断该路径是否是目录*/
        finder.FindNextFile();
        bRet = finder.IsDirectory();
        finder.Close();
        return bRet;
    }

    /*删除目录及目录中的所有内容*/
    BOOL DeleteFolder(LPCTSTR pstrFolder)
    {
        if ((NULL == pstrFolder))
        {
            return FALSE;
        }

        /*检查输入目录是否是合法目录*/
        if (!IsDirectory(pstrFolder))
        {
            return FALSE;
        }

        /*创建源目录中查找文件的通配符*/
        CString strWildcard(pstrFolder);
        if (strWildcard.Right(1) != _T('\\'))
        {
            strWildcard += _T("\\");
        }
        strWildcard += _T("*.*");

        /*打开文件查找，查看源目录中是否存在匹配的文件*/
        /*调用FindFile后，必须调用FindNextFile才能获得查找文件的信息*/
        CFileFind finder;
        BOOL bWorking = finder.FindFile(strWildcard);

        while (bWorking)
        {
            /*查找下一个文件*/
            bWorking = finder.FindNextFile();

            /*跳过当前目录“.”和上一级目录“..”*/
            if (finder.IsDots())
            {
                continue;
            }

            /*得到当前目录的子文件的路径*/
            CString strSubFile = finder.GetFilePath();

            /*判断当前文件是否是目录,*/
            /*如果是目录，递归调用删除目录,*/
            /*否则，直接删除文件*/
            if (finder.IsDirectory())
            {
                if (!DeleteFolder(strSubFile))
                {
                    finder.Close();
                    return FALSE;
                }
            }
            else
            {
                if (!DeleteFile(strSubFile))
                {
                    finder.Close();
                    return FALSE;
                }
            }

        } /*while (bWorking)*/

        /*关闭文件查找*/
        finder.Close();

        /*删除空目录*/
        return RemoveDirectory(pstrFolder);
    }
```



### 参考

  1. [遍历一个文件夹下面的所有文件MFC版本](http://www.cnblogs.com/kex1n/archive/2011/11/22/2258773.html)
  2. [文件夹操作：复制和删除整个文件夹](http://www.cnblogs.com/xianyunhe/archive/2011/12/06/2278550.html)
