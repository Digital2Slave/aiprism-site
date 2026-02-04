# python学习遇到问题及解决方案

1\. Enthought 默认安装，初始化问题：(http://help.canopy/welcome.html) WSGI Proxy "Server" Error. 'ascii' codec can't decode byte 0xb0 in position 1: ordinal not in range(128)

解决方案：

C:\Users\your-username\AppData\Local\Enthought\Canopy\App\appdata\canopy-1.3.0.1715.win-x86_64\Lib\mimetypes.py

on both lines 250 and 272, change UnicodeEncodeError to UnicodeError.


```
    http://blog.enthought.com/enthought-canopy/canopy1-3release/#.U10Py43s4Rs
```



  
  