# python 模块和包

1.模块

模块是python组织代码的基本方式。python的脚本都是以.py为扩展名保存的文本文件。一个脚本可以单独运行，也可以导入另一个脚本中运行。当脚本被导入运行时，我们将其

称为模块。

模块名与脚本的文件名相同！例如我们编写一个cal.py的脚本，则可以在另外一个脚本中用import cal语句来导入它进行相关运算操作。


```
    user1@ubuntu:~$ cd csvtpy/
    user1@ubuntu:~/csvtpy$ ls
    10.py  9.py       cal.py   fabs.py      __init__.pyc  scal.py
    8.py   calnew.py  cal.pyc  __init__.py  new.py        test.py
    user1@ubuntu:~/csvtpy$ vim cal.py
    user1@ubuntu:~/csvtpy$ python cal.py
    6
    user1@ubuntu:~/csvtpy$ vim calnew.py
    user1@ubuntu:~/csvtpy$ python calnew.py
    7
```



  
cal.py: 


```python
    #!/usr/bin/python
    #coding:utf8

    from __future__  import division

    def jia(x,y):
        return x+y

    def jian(x,y):
        return x-y

    def cheng(x,y):
        return x*y

    def chu(x,y):
        return x/y

    def operator(x,o,y):
        if o == "+":
            print jia(x,y)
        elif o == "-":
            print jian(x,y)
        elif o == "*":
            print cheng(x,y)
        elif o == "/":
            print chu(x,y)
        else:
            pass
    if  __name__ == "__main__":#该脚本模块默认输入名称__main__
        operator(2,"*",3)
```



calnew.py: 


```
    #coding:utf8    #允许输入中文
    import cal      #调用cal模块
    x = cal.jia(3,4)#调用cal模块的加法运算
    print x
```



  
2.包  
python的模块可以按照目录组织为包。其创建的步骤为：  
1）建立一个名字为包名字的文件夹；  
2）在该文件夹下创建一个__init__.py文件；  
3）根据需要在该文件夹下存放脚本文件、已编译扩展及子包；  
例如：import pack.m1,pack.m2,pack.m3  
表示导入包pack文件夹下面的m1、m2和m3脚本文件。  
  
下面以csvtpy包为例：  



```
    user1@ubuntu:~/csvtpy$ touch __init__.py
    user1@ubuntu:~/csvtpy$ cd ~
    user1@ubuntu:~$ ls
    csvtpy   Documents  examples.desktop  packtest.py  Public     test.py
    Desktop  Downloads  Music             Pictures     Templates  Videos
    user1@ubuntu:~$ vim packtest.py
    user1@ubuntu:~$ python packtest.py
    15
```



packtest.py: 


```
    #coding:utf8
    import csvtpy.cal       #调用csvtpy包里面的cal模块
    x = csvtpy.cal.jia(7,8) #调用csvtpy包里cal模块的加法运算
    print x                 #打印输出运算结果x
```



  
3.小结  
1>模块是一个可以导入的python脚本文件；  
2>包是一堆按目录组织的模块和子包，目录下的__init__.py文件存放了包的信息；  
3>可以用import,import as,from import等语句导入模块和包。  



```
    user1@ubuntu:~$ cd csvtpy/
    user1@ubuntu:~/csvtpy$ ls
    10.py  9.py    cal.pyc  __init__.py   new.py   test.py
    8.py   cal.py  fabs.py  __init__.pyc  scal.py
    user1@ubuntu:~/csvtpy$ python
    Python 2.7.3 (default, Sep 26 2013, 20:03:06)
    [GCC 4.6.3] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> import cal
    >>>
    >>> cal.jia(10,20)
    30
    >>> import cal as c
    >>> c.jia(1,2)
    3
    >>> from cal import jia
    >>>
    >>> jia(1,2)
    3
    >>>
```



  
```