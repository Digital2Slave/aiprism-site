# python OS-目录遍历-异常处理

1.---OS操作---  
  


linux下创建多级目录：mkdir -p a/b/c/d

  



```
    [user1@localhost Desktop]$ cd ~
    [user1@localhost ~]$ ls
    a2.t  Desktop    Downloads           Music    Pictures  replace.py  test.txt
    a.t   Documents  filefindreplace.py  new.txt  Public    Templates   Videos
    [user1@localhost ~]$ mkdir csvt
    [user1@localhost ~]$ cd csvt/
    [user1@localhost csvt]$ python
    Python 2.6.6 (r266:84292, Jul 10 2013, 22:48:45)
    [GCC 4.4.7 20120313 (Red Hat 4.4.7-3)] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> import os
    >>> os.mkdir('jpp')
    >>> os.mkdir('test')
    >>> os.makedirs('a/b/c')
    >>> os.rmdir('test')
    >>> os.removedirs('a/b/c')
    >>> os.listdir('.')
    ['jpp']
    >>> os.listdir('/')
    ['etc', '.readahead_collect', 'usr', 'proc', 'boot', 'sbin', '.autofsck', 'mnt', 'sys', 'tmp', 'home', 'srv', 'root', 'media', 'opt', 'lib64', 'bin', 'lib', 'lost+found', 'dev', 'selinux', 'var']
    >>> os.getcwd()
    '/home/user1/csvt'
    >>> os.chdir('/')
    >>> os.listdir('.')
    ['etc', '.readahead_collect', 'usr', 'proc', 'boot', 'sbin', '.autofsck', 'mnt', 'sys', 'tmp', 'home', 'srv', 'root', 'media', 'opt', 'lib64', 'bin', 'lib', 'lost+found', 'dev', 'selinux', 'var']
    >>> os.getcwd()
    '/'
    >>> exit()
```



  



```
    [user1@localhost csvt]$ ls
    jpp
    [user1@localhost csvt]$ ls
    jpp  test
    [user1@localhost csvt]$ ls
    a  jpp  test
    [user1@localhost csvt]$ cd a/
    [user1@localhost a]$ ls
    b
    [user1@localhost a]$ cd b/
    [user1@localhost b]$ ls
    c
    [user1@localhost b]$ cd c/
    [user1@localhost c]$ cd ~
    [user1@localhost ~]$ cd ~
    [user1@localhost ~]$ cd ~
    [user1@localhost ~]$ cd csvt/
    [user1@localhost csvt]$ ls
    a  jpp  test
    [user1@localhost csvt]$ ls
    a  jpp
    [user1@localhost csvt]$ ls
    jpp
    [user1@localhost csvt]$
```



  
2---目录遍历---  


  



```python
    #!/usr/bin/python
    #coding:utf8

    import os

    def dirList(path):
        filelist = os.listdir(path)
        #fpath = os.getcwd() 删除
        #allfile = []
        for filename in filelist:
            #allfile.append(fpath+'/'+filename)---1
            #filepath = os.path.join(fpath,filename)---2
            #allfile.append(filepath)----2
            filepath = os.path.join(path,filename)
            if os.path.isdir(filepath):
                dirList(filepath)
            #allfile.append(filepath)
            print filepath

    allfile = dirList('/root/csvtpy/testdir')
    print allfile
```



  
3---异常处理---  


  



```
    #coding:utf8

    filename = raw_input('请输入您要操作的文件:')

    try:
        f = open(filename)
        print 'hello'
    except IOError,msg:
        print "您指定的文件不存在"
    except NameError,msg:
        print "内部变量调用错误"
    finally:
        try:
            f.close()
        except NameError,msg:
            pass
        print "It's done!"

    if filename == "hello":
        raise TypeError("Nothing!")
```



  
  
```