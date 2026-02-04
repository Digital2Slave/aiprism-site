# python--脚本语言

1.进入python

Python,一个解释型、面向对象的、带有动态语义的高级程序设计语言。

1989年阿姆斯特丹，圣诞节，Guido van Rossum第一个python版本。

Python编程语言中的定位：

\--脚本语言(scripting language)，高阶动态编程语言

Python特征：简单易学，解释性&编译性语言，面向对象，高级语言，可扩展性及可嵌入性，免费、开源，丰富的库。

2.搭建python环境

Linux环境vim编辑和Windows环境

3.python文件类型

源代码—python源代码的文件以”.py”为扩展名，由python程序解释，不需要编译；

字节代码—python源文件经编译后生成的扩展名为”.pyc”文件；

编译方法—import py_compile

py_compile.compile(“hello.py”)

优化代码—经过优化的源代码，扩展名为”.pyo”

Python –O –m py_compile hello.py

以上三种均可直接运行

  



```
    user1@ubuntu:~$ su
    Password:
    root@ubuntu:/home/user1# cd ~
    root@ubuntu:~# cd csvtpy/
    root@ubuntu:~/csvtpy# ls
    root@ubuntu:~/csvtpy# vim 1.py
    root@ubuntu:~/csvtpy# python 1.py
    hello world
    root@ubuntu:~/csvtpy# python
    Python 2.7.3 (default, Apr 10 2013, 06:20:15)
    [GCC 4.6.3] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> print 'hello world!'
    hello world!
    >>> exit()
    root@ubuntu:~/csvtpy# ls
    1.py
    root@ubuntu:~/csvtpy# vim 1.py
    root@ubuntu:~/csvtpy# ll
    total 12
    drwxr-xr-x 2 root root 4096 Nov 23 02:48 ./
    drwx------ 4 root root 4096 Nov 23 02:48 ../
    -rw-r--r-- 1 root root   39 Nov 23 02:48 1.py
    root@ubuntu:~/csvtpy# chod +x 1.py
    No command 'chod' found, did you mean:
     Command 'chmod' from package 'coreutils' (main)
    chod: command not found
    root@ubuntu:~/csvtpy# chmod +x  1.py
    root@ubuntu:~/csvtpy#
    root@ubuntu:~/csvtpy#
    root@ubuntu:~/csvtpy# python 1.py
    hello world
    root@ubuntu:~/csvtpy#
    root@ubuntu:~/csvtpy#
    root@ubuntu:~/csvtpy# ./1.py
    hello world
    root@ubuntu:~/csvtpy# ls
    1.py
    root@ubuntu:~/csvtpy# vim 2.py
    root@ubuntu:~/csvtpy# ls
    1.py  2.py
    root@ubuntu:~/csvtpy# ./2.py
    bash: ./2.py: Permission denied
    root@ubuntu:~/csvtpy# python 2.py
    Traceback (most recent call last):
      File "2.py", line 3, in <module>
        py_compile.complie('1.py')
    AttributeError: 'module' object has no attribute 'complie'
    root@ubuntu:~/csvtpy# vim 2.py
    root@ubuntu:~/csvtpy# python  2.py
    Traceback (most recent call last):
      File "2.py", line 3, in <module>
        py_compile.complie('1.py')
    AttributeError: 'module' object has no attribute 'complie'
    root@ubuntu:~/csvtpy# vim 2.py
    root@ubuntu:~/csvtpy# ls
    1.py  2.py
    root@ubuntu:~/csvtpy# python  2.py
    root@ubuntu:~/csvtpy# ls
    1.py  1.pyc  2.py
    root@ubuntu:~/csvtpy# vim 1.pyc
    root@ubuntu:~/csvtpy# ls
    1.py  1.pyc  2.py
    root@ubuntu:~/csvtpy# python -o -m py_compile 1.py
    Unknown option: -o
    Unknown option: -o
    usage: python [option] ... [-c cmd | -m mod | file | -] [arg] ...
    Try `python -h' for more information.
    root@ubuntu:~/csvtpy# python -O -m py_compile 1.py
    root@ubuntu:~/csvtpy# ls
    1.py  1.pyc  1.pyo  2.py
    root@ubuntu:~/csvtpy# vim 1.pyo
    root@ubuntu:~/csvtpy# ls
    1.py  1.pyc  1.pyo  2.py
    root@ubuntu:~/csvtpy# chmod +x *
    root@ubuntu:~/csvtpy# ls
    1.py  1.pyc  1.pyo  2.py
    root@ubuntu:~/csvtpy# ./1.py
    hello world
    root@ubuntu:~/csvtpy# ./1.pyc
    ./1.pyc: line 1: $'\003\363\r': command not found
    ./1.pyc: line 2: syntax error near unexpected token `('
    ./1.pyc: line 2: `???Rc@s    dGHdS(s
    '                                        hello worldN((((s1.py<module>s
    root@ubuntu:~/csvtpy# python 1.py
    hello world
    root@ubuntu:~/csvtpy# pthon 1.pyc
    No command 'pthon' found, did you mean:
     Command 'python' from package 'python-minimal' (main)
    pthon: command not found
    root@ubuntu:~/csvtpy# python 1.pyc
    hello world
    root@ubuntu:~/csvtpy# python 1.pyo
    hello world
    root@ubuntu:~/csvtpy# vim 1.py
    root@ubuntu:~/csvtpy# cd ~
    root@ubuntu:~#
```



  
  