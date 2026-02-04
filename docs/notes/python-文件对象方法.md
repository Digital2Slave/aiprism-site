# python 文件对象方法




```
    [user1@localhost ~]$ python
    Python 2.6.6 (r266:84292, Jul 10 2013, 22:48:45)
    [GCC 4.4.7 20120313 (Red Hat 4.4.7-3)] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> f1 = open('test.txt')
    >>> s1 = f1.read()
    >>> s1
    'www.csvt.net\ni am a python leaner.\n\n'
    >>> f1.close()
    >>>
    >>> for i in open('test.txt'):
    ...     print i
    ...
    www.csvt.net

    i am a python leaner.



    >>> f1 = open('test.txt')
    >>> f1.readline()
    'www.csvt.net\n'
    >>> f1.readline()
    'i am a python leaner.\n'
    >>> f1.readline()
    '\n'
    >>> f1.readline()
    ''
    >>> f1.close()
    >>> f1 = open('test.txt')
    >>> f1.readlines()
    ['www.csvt.net\n', 'i am a python leaner.\n', '\n']
    >>> f1 = open('test.txt')
    >>> f1.next()
    'www.csvt.net\n'
    >>> f1.next()
    'i am a python leaner.\n'
    >>> f1.next()
    '\n'
    >>> f1.next()
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    StopIteration
    >>> l = ['one\n','two\n','three\n']
    >>> f1 = open('test.txt','a')
    >>> f1.writelines(l)
    >>> f1.close
    <built-in method close of file object at 0x7f3681965d20>
    >>> f1.close()
    >>> f1 = open('test.txt','r+')
    >>> f1.read()
    'www.csvt.net\ni am a python leaner.\n\none\ntwo\nthree\n'
    >>> f1.read()
    ''
    >>> f1.seek(0,0)
    >>> f1.read()
    'www.csvt.net\ni am a python leaner.\n\none\ntwo\nthree\n'
    >>> f1.seek(0,0)
    >>> f1.seek(0,2)
    >>> f1.read()
    ''
    >>> f1.writelines(l)
    >>> f1.flush()
    >>> f1.close()
    >>>
```



  



```
    [user1@localhost ~]$ ls
    Desktop    Downloads  new.txt   Pictures  Templates  test.txt~
    Documents  Music      new.txt~  Public    test.txt   Videos
    [user1@localhost ~]$ cat test.txt
    www.csvt.net
    i am a python leaner.

    [user1@localhost ~]$ ls
    Desktop    Downloads  new.txt   Pictures  Templates  test.txt~
    Documents  Music      new.txt~  Public    test.txt   Videos
    [user1@localhost ~]$ cat test.txt
    www.csvt.net
    i am a python leaner.

    one
    two
    three
    [user1@localhost ~]$ cat test.txt
    www.csvt.net
    i am a python leaner.

    one
    two
    three
    [user1@localhost ~]$ cat test.txt
    www.csvt.net
    i am a python leaner.

    one
    two
    three
    one
    two
    three
    [user1@localhost ~]$
```



  
  