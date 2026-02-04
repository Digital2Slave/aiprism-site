# python 内建函数

abs(): 绝对值  
max(): 最大值  
min(): 最小值  
  
len(): 序列(字符串、元组和列表)的长度  


divmod(): 两个数的商和余数


```
    >>> divmod(5,2)
    (2, 1)
    >>> divmod(2,5)
    (0, 2)
```



pow(): 幂次操作  
round(): 转换为有一定精度的小数  
  


callable(): 测试某个函数是否可被调用


```
    >>> min(1,2,3)
    1
    >>> callable(min)
    True
    >>> callable(f)
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    NameError: name 'f' is not defined
    >>>
    >>>
    >>> f=100
    >>>
    >>> callable(f)
    False
    >>> def f():
    ...     pass
    ...
    >>> callable(f)
    True
```



isinstance(): 判断类型，eg:isinstance(l,list)


```
    >>> l
    [1, 2, 3, 4, 6]
    >>> type(l)
    <type 'list'>
    >>> type([])
    <type 'list'>
    >>> if type([])==type([]):
    ... print 'ok'
      File "<stdin>", line 2
        print 'ok'
            ^
    IndentationError: expected an indented block
    >>> if type(l)==type([]):
    ...     print 'ok'
    ...
    ok
    >>> isinstance(l,list)
    True
```



cmp(): 比较两个字符串是否一样


```
    >>> cmp("hello","hello")
    0
```



range(): 返回一个生成好的序列  
xrange(): 返回一个序列对象，生存器  
  
type():查看类型  
int(),long(),float()和complex()数据类型转换  
str(),list(),tuple(),hex(),oct(),chr()和ord()均为类型转化函数  
  
python String函数  


str.capitalize():把字符串首字母变为大写


```
    >>> str.capitalize(s)
    'Hello world'
    >>> s.capitalize()
    'Hello world'
    >>> s
    'hello world'
    >>> s.replace("hello",'good')
    'good world'
    >>> s
    'hello world'
    >>> help(str.replace)
```



str.replace():替换字符串中的字母


```
    >>> s
    'hello world'
    >>> s.replace("hello",'good')
    'good world'
    >>> s
    'hello world'
    >>> help(str.replace)

    >>> ss="123123123"
    >>> ss.replace('1','x')
    'x23x23x23'
    >>> ss.replace('1','x',1)
    'x23123123'
    >>> ss.replace('1','x',2)
    'x23x23123'
    >>> ss.replace('1','x',3)
    'x23x23x23'
```



str.split():字符串切割


```
    >>> ip="192.168.1.255"
    >>> ip
    '192.168.1.255'
    >>> ip.split('.')
    ['192', '168', '1', '255']
    >>> ip.split('.',1)
    ['192', '168.1.255']
    >>> ip.split('.',2)
    ['192', '168', '1.255']
    >>> ip.split('.',3)
    ['192', '168', '1', '255']
    >>>
```



  
序列处理函数：  
len():返回序列的长度  
max():返回序列的最大值  
min():返回序列的最小值  
其他：  
filter():函数对序列进行操作，有效时保持序列值不变。  



```
    >>> def f(x):
    ...     if x>5:
    ...             return True
    ...
    >>> f(10)
    True
    >>> l = range(10)
    >>> l
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    >>> filter(f,l)
    [6, 7, 8, 9]
    >>>
```



  
zip():  



```
    >>> name = ['tianzhaixing','wang','tom']
    >>> age = [26,24,30]
    >>> tel = ['158','135','180']
    >>>
    >>> zip(name,age,tel)
    [('tianzhaixing', 26, '158'), ('wang', 24, '135'), ('tom', 30, '180')]
    >>>
```



  
map():  



```
    >>> name = ['tianzhaixing','wang','tom']
    >>> age = [26,24,30]
    >>> tel = ['158','135','180']
    >>> map(None,name,age,tel)
    [('tianzhaixing', 26, '158'), ('wang', 24, '135'), ('tom', 30, '180')]
    >>>


    >>> a = [1,3,5]
    >>> b = [2,4,6]
    >>> def mf(x,y):
    ...     return x*y
    ...
    >>> map(None,a,b)
    [(1, 2), (3, 4), (5, 6)]
    >>> map(mf,a,b)
    [2, 12, 30]
    >>>

    >>> foo=range(10)
    >>> foo
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    >>> print [x*2+10 for x in foo]
    [10, 12, 14, 16, 18, 20, 22, 24, 26, 28]
    >>>
```



  
zip和map的一点区别：  



```
    >>> name
    ['tianzhaixing', 'wang', 'tom']
    >>> age
    [26, 24, 30]
    >>> tel
    ['158', '135', '180']
    >>> test=[1,2]
    >>> zip(name,age,tel)
    [('tianzhaixing', 26, '158'), ('wang', 24, '135'), ('tom', 30, '180')]
    >>> zip(name,age,tel,test)
    [('tianzhaixing', 26, '158', 1), ('wang', 24, '135', 2)]
    >>> map(None,name,age,tel,test)
    [('tianzhaixing', 26, '158', 1), ('wang', 24, '135', 2), ('tom', 30, '180', None)]
    >>>
```



  
reduce():递归使用的内建函数  



```
    >>> l
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
    >>>
    >>> def rf(x,y):
    ...     return x+y
    ...
    >>> reduce(rf,l)
    5050
    >>> help(reduce)

    >>> reduce(lambda x,y:x+y,l)
    5050


    >>> l
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
    >>> filter(lambda x:x%2==0,l)
    [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100]
    >>>


    >>> foo=range(10)
    >>> foo
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    >>> print [x*2+10 for x in foo]
    [10, 12, 14, 16, 18, 20, 22, 24, 26, 28]
    >>> print [x for x in foo if x % 3 == 0]
    [0, 3, 6, 9]
    >>>
```



  
  