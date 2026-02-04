# python return语句

函数返回值：

  


1)函数被调用后会返回一个指定的值

  


2)函数调用后默认返回None

  


3)return返回值

  


4)返回值可以是任意类型

  


5)return执行后，函数终止

  


6)区分返回值和打印

  



```
    user1@ubuntu:~$ python
    Python 2.7.3 (default, Sep 26 2013, 20:03:06)
    [GCC 4.6.3] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> def f(x):
    ...     print x
    ...
    >>> f(0)
    0
    >>> def f(x,y):
    ...     print x+y
    ...
    >>> f(2,3)
    5
    >>> f('i love','you')
    i loveyou
    >>> f('i love',' you')
    i love you
    >>> z=f(2,3)
    5
    >>> z
    >>> print z
    None
    >>> sum([1,2,3,4,5])
    15
    >>> z = sum([1,2,3,4,5])
    >>> z
    15
    >>> def f(x,y):
    ...     print "welcome !"
    ...     return x+y
    ...
    >>> f(2,3)
    welcome !
    5
    >>> z=f(2,3)
    welcome !
    >>> z
    5
    >>> def f():
    ...     return "hello"
    ...
    >>> f()
    'hello'
    >>> x = f()
    >>> x
    'hello'
    >>> print x
    hello
    >>> def f():
    ...     return range(10)
    ...
    >>> f()
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    >>> def f():
    ...     return "one"
    ...     return "two"
    ...
    >>> f()
    'one'
    >>> def f(x,y):
    ...     if x>y:
    ...             return 1
    ...     if x<y:
    ...             return -1
    ...     if x==y:
    ...             return 0
    ...
    >>> f(2,3)
    -1
    >>> f(2,1)
    1
    >>> f(2,2)
    0
    >>> def f(x,y):
    ...     if x>y:
    ...             return 1
    ...     if x<y:
    ...             return -1
    ...     return 0
    ...
    >>> f(1,2)
    -1
    >>> def f(x,y):
    ...     if x<y:
    ...             return -1
    ...     print "hello world"
    ...
    >>> f(1,4)
    -1
    >>> f(4,1)
    hello world
    >>> z = f(4,1)
    hello world
    >>> z
    >>> print z
    None
    >>> z = f(1,4)
    >>> z
    -1
    >>> print z
    -1
    >>>
```



  
  