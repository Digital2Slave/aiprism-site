# python 文件读写




```
    [user1@localhost ~]$ ls
    Desktop    Downloads  new.txt   Pictures  Templates  test.txt~
    Documents  Music      new.txt~  Public    test.txt   Videos
    [user1@localhost ~]$ python
    Python 2.6.6 (r266:84292, Jul 10 2013, 22:48:45)
    [GCC 4.4.7 20120313 (Red Hat 4.4.7-3)] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> fnew = open('new.txt','w')
    >>> fnew.write('\ntianzhaixing\n')
    >>> fnew.close()
    >>> fnew = open('new.txt','w')
    >>> fnew.write('i love you!')
    >>> fnew.close()
    >>> fnew = open('new.txt','r+')
    >>> fnew.read()
    'i love you!'
    >>> fnew.write('i am a python leaner.')
    >>> fnew.close()
    >>> fnew = open('new.txt','r+')
    >>> fnew.write('uuu')
    >>> fnew.close()
    >>>


    [user1@localhost ~]$ ls
    Desktop    Downloads  new.txt   Pictures  Templates  test.txt~
    Documents  Music      new.txt~  Public    test.txt   Videos
    [user1@localhost ~]$ cat new.txt
    [user1@localhost ~]$ cat new.txt

    tianzhaixing
    [user1@localhost ~]$ cat new.txt
    [user1@localhost ~]$ cat new.txt
    i love you![user1@localhost ~]$ cat new.txt
    i love you!i am a python leaner.[user1@localhost ~]$
    [user1@localhost ~]$ cat new.txt
    uuuove you!i am a python leaner.[user1@localhost ~]$
```



  