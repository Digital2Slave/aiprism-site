# python 文件打开和关闭




```
    [user1@localhost ~]$ ls
    Desktop    Downloads  Pictures  Templates  test.txt~
    Documents  Music      Public    test.txt   Videos
    [user1@localhost ~]$ cat test.txt
    www.cvst.net
    i am a python leaner.
    hello world.
    [user1@localhost ~]$ python
    Python 2.6.6 (r266:84292, Jul 10 2013, 22:48:45)
    [GCC 4.4.7 20120313 (Red Hat 4.4.7-3)] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> fo = open('test.txt')
    >>> fo
    <open file 'test.txt', mode 'r' at 0x7fd6062c9d20>
    >>> fo.read()
    'www.cvst.net\ni am a python leaner.\nhello world.\n'
    >>> fo.close()
    >>> fo.read()
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    ValueError: I/O operation on closed file
    >>> f1 = file('test.txt')
    >>> f1.read()
    'www.cvst.net\ni am a python leaner.\nhello world.\n'
    >>> f1.close()
    >>> f1.read()
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    ValueError: I/O operation on closed file
    >>> f1 = open('test.txt')
    >>> f1
    <open file 'test.txt', mode 'r' at 0x7fd6062c9e40>
    >>> f1.write('good csvt')
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    IOError: File not open for writing
    >>> f1.close
    <built-in method close of file object at 0x7fd6062c9e40>
    >>>
```



  