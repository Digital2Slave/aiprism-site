# Python Windows文件名称检查

最近两天在做一些网络爬虫，下载图片的工作。由于，保存图片的过程中，会出现文件名称非法的BUG。因此，实现了一个Windows系统下，检查文件名称的Python脚本。具体实现源码和运行结果，如下所示。

> 备注： Python用的是Python 3.5.2版本。

### 测试源码


```python
    # -*- encoding:utf-8 -*-
    import re


    def checkNameValid(name=None):
        """
        检测Windows文件名称！
        """
        if name is None:
            print("name is None!")
            return
        reg = re.compile(r'[\\/:*?"<>|\r\n]+')
        valid_name = reg.findall(name)
        if valid_name:
            for nv in valid_name:
                name = name.replace(nv, "_")
        return name


    def test(name):
        return checkNameValid(name)


    if __name__ == '__main__':
        namelist = [
            r"中国*/1314.jpg",
            r"China\f520:13*14?2016.jpg"
        ]
        for name in namelist:
            print(test(name))
```



### 运行结果


```
    中国_1314.jpg
    China_f520_13_14_2016.jpg
```

```