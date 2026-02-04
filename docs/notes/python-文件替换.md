# python 文件替换




```
    #/usr/bin/python
    #coding:utf8

    #文件内容替换练习
    #1.把a.t中的hello替换为csvt,并保存到文件a2.t中。
    #2.把a.t中的hello替换为csvt,并保存到原文件中去。

    #problem1:

    fp1 = file("a.t","r")
    fp2 = file("a2.t","w")

    for s in fp1.readlines():
        fp2.write(s.replace("hello","csvt"))
    fp1.close()
    fp2.close()
    #problem2:
    fp3 = file("a.t","r+")
    s = fp3.read()
    fp3.seek(0,0)
    fp3.write(s.replace("hello","i love u"))
    fp3.close()
```



  



```
    [user1@localhost ~]$ ls
    a.t      Documents           Music     Pictures    Templates  Videos
    a.t~     Downloads           new.txt   Public      test.txt
    Desktop  filefindreplace.py  new.txt~  replace.py  test.txt~
    [user1@localhost ~]$ rm a.t~
    [user1@localhost ~]$ rm new.txt~
    [user1@localhost ~]$ rm test.txt~
    [user1@localhost ~]$ ls
    a.t      Documents  filefindreplace.py  new.txt   Public      Templates  Videos
    Desktop  Downloads  Music               Pictures  replace.py  test.txt
    [user1@localhost ~]$ vim replace.py
    [user1@localhost ~]$ python replace.py
    [user1@localhost ~]$ ls
    a2.t  Desktop    Downloads           Music    Pictures  replace.py  test.txt
    a.t   Documents  filefindreplace.py  new.txt  Public    Templates   Videos
    [user1@localhost ~]$ cat a2.t
    csvt world
    csvt csvt world
    [user1@localhost ~]$




    [user1@localhost Desktop]$ cd ~
    [user1@localhost ~]$ ls
    a2.t  Desktop    Downloads           Music    Pictures  replace.py  test.txt
    a.t   Documents  filefindreplace.py  new.txt  Public    Templates   Videos
    [user1@localhost ~]$ cat a.t
    hello world
    hello hello world
    [user1@localhost ~]$ cat a2.t
    csvt world
    csvt csvt world
    [user1@localhost ~]$ vim replace.py
    [user1@localhost ~]$ python replace.py
    [user1@localhost ~]$ cat a.t
    i love u world
    i love u i love u world
    [user1@localhost ~]$ cat a2.t
    csvt world
    csvt csvt world
    [user1@localhost ~]$
```



  
  