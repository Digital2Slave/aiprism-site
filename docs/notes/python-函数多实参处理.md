# python 函数多实参处理

向函数传元组和字典：f(*t) 和 f(**d)  


处理多余实参：f(x,*args,**kargs)


```
    user1@ubuntu:~$ python
    Python 2.7.3 (default, Sep 26 2013, 20:03:06)
    [GCC 4.6.3] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> def f(x):
    ...     print x
    ...
    >>> f(10)
    10
    >>> f('hello')
    hello
    >>> f([1,2,3,4])
    [1, 2, 3, 4]
    >>> f(range(10))
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    >>>
    >>> l = range(10)
    >>>
    >>> f(l)
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    >>> f(('a','b'))
    ('a', 'b')
    >>> f({1:111,2:222,3:333})
    {1: 111, 2: 222, 3: 333}
    >>>
    >>> def f(x,y):
    ...     print x
    ...     print y
    ...
    >>> f(1,2)
    1
    2
    >>> f('a','b')
    a
    b
    >>> t=('a','b')
    >>>
    >>> f(t[0],t[1])
    a
    b
    >>> f(t,'test')
    ('a', 'b')
    test
    >>>
    >>>
    >>> t = ('name','tianzhaixing')
    >>>
    >>> def f(x,y):
    ...     print "%s : %s" % x,y
    ...
    >>> print "s% : s%"
    s% : s%
    >>> print "%s : %s" % ('name','tianzhaixing')
    name : tianzhaixing
    >>> def f(x,y):
    ...     print "%s : %s" % (x,y)
    ...
    >>> f(*t)
    name : tianzhaixing
    >>> tt = ('name','tianzhaixing','26')
    >>> tt
    ('name', 'tianzhaixing', '26')
    >>> def f(name="name",age=0)
      File "<stdin>", line 1
        def f(name="name",age=0)
                               ^
    SyntaxError: invalid syntax
    >>> def f(name="name",age=0):
    ...     print "name: %s" % name
    ...     print "age : %s" % age
    ...
    >>> f("tianzhaixing",26)
    name: tianzhaixing
    age : 26
    >>>
    >>> f()
    name: name
    age : 0
    >>>
    >>> t=(26,'tianzhaixing')
    >>> f(*t)
    name: 26
    age : tianzhaixing
    >>> d = {'name':tianzhaixing,'age':30}
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    NameError: name 'tianzhaixing' is not defined
    >>> d = {'name':'tianzhaixing','age':30}
    >>> d
    {'age': 30, 'name': 'tianzhaixing'}
    >>> f(name="tianzhaixing",age=26)
    name: tianzhaixing
    age : 26
    >>> f(age=26,name=
    ... 'tianzhaixing')
    name: tianzhaixing
    age : 26
    >>> f(**d)
    name: tianzhaixing
    age : 30
    >>> d['age']=27
    >>> d
    {'age': 27, 'name': 'tianzhaixing'}
    >>> f(**d)
    name: tianzhaixing
    age : 27
    >>> d = {'a':26,'n':'tianzhaixing'}
    >>> d
    {'a': 26, 'n': 'tianzhaixing'}
    >>> f(**d)
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    TypeError: f() got an unexpected keyword argument 'a'
    >>> f(d['n'],d['a'])
    name: tianzhaixing
    age : 26
    >>> def f(x):
    ...     print x
    ...
    >>> f(1)
    1
    >>>
    >>> def f(x,*args):
    ...     print x
    ...     print args
    ...
    >>> f(1)
    1
    ()
    >>> f(1,2,3)
    1
    (2, 3)
    >>> f(x=4,y=40)
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    TypeError: f() got an unexpected keyword argument 'y'
    >>> def f(x,*args,**kargs):
    ...     print x
    ...     print args
    ...     print kargs
    ...
    >>> f(1)
    1
    ()
    {}
    >>> f(1,2,3,4,5,6)
    1
    (2, 3, 4, 5, 6)
    {}
    >>> f(x=1)
    1
    ()
    {}
    >>> f(x=1,y=2)
    1
    ()
    {'y': 2}
    >>> f(1,2,3,4,5,6,x=10,y=20,z=30)
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    TypeError: f() got multiple values for keyword argument 'x'
    >>> f(1,2,3,4,5,6,y=20,z=30)
    1
    (2, 3, 4, 5, 6)
    {'y': 20, 'z': 30}
    >>>
```



  
  