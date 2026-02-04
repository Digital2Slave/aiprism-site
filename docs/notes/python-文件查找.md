# python 文件查找




```
    #/usr/bin/python
    #coding:utf8

    #problem1:find file
    #cat a.t
    #hello world
    #hello hello world
    #统计文件a.t中hello的个数

    import re

    fp = file("a.t","r")#
    count = 0
    for s in fp.readlines():
        li = re.findall("hello",s)
        if len(li)>0:
            count+=len(li)
    print "Search",count,"hello"

    fp.close()
```



  


  



```
    [user1@localhost Desktop]$ cd ~
    [user1@localhost ~]$ ls
    a.t      Documents           Music     Pictures   test.txt
    a.t~     Downloads           new.txt   Public     test.txt~
    Desktop  filefindreplace.py  new.txt~  Templates  Videos
    [user1@localhost ~]$ vim filefindreplace.py
    [user1@localhost ~]$ cat a.t
    hello world
    hello hello world
    [user1@localhost ~]$ python filefindreplace.py
    Search 3 hello
    [user1@localhost ~]$
```



  
  