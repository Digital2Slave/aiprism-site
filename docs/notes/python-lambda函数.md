# python lambda函数

lambda：匿名函数  
lambda函数是一种快速定义单行的最小函数，从Lisp借用而来，可以用在任何函数的地方。  
  


lambd语句中，冒号前是参数，可以有多个以逗号分开的参数；冒号后面是返回值。lambda语句构建的其实是一个函数对象.


```
    >>> g = lambda x,y:x+y
    >>> g
    <function <lambda> at 0x23556e0>
```



  
reduce为逐次操作list里的每一项，接收的参数为两个，最后返回一个结果。  



```
    >>> def add0(x,y)
    >>>     return x+y
    >>> sum=reduce(add0,(1,2,3))
    >>> 6
```



  



```
    user1@ubuntu:~$ python
    Python 2.7.3 (default, Sep 26 2013, 20:03:06)
    [GCC 4.6.3] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> def f(x,y):
    ...     return x*y
    ...
    >>> f(2,3)
    6
    >>> g = lambda x,y:x*y
    >>> g(2,3)
    6
    >>> lambda x,y:x*y
    <function <lambda> at 0x2355668>
    >>> g = lambda x,y:x+y
    >>> g
    <function <lambda> at 0x23556e0>
    >>> g(6,2)
    8
    >>> 5*4*3*2*1
    120
    >>>


    user1@ubuntu:~$ python
    Python 2.7.3 (default, Sep 26 2013, 20:03:06)
    [GCC 4.6.3] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> l = range(1,6)
    >>> l
    [1, 2, 3, 4, 5]
    >>> def f(x,y):
    ...     return x*y
    ...
    >>> reduce(f,l)
    120
    >>> f = lambda x,y:x*y
    >>> reduce(f,l)
    120
    >>>
    >>>
    >>> reduce(lambda x,y:x*y ,l)
    120
    >>> sum = reduce(lambda x,y:x+y,(1,2,3))
    >>> sum
    6
    >>>
```



  
  