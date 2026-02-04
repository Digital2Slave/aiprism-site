# python switch函数

python并没有提供switch语句！python可以通过字典实现switch语句的功能。

1)首先，定义一个字典；  


2)其次，调用字典的get()获取相应的表达式。


```python
    #!/usr/bin/python
    #coding:utf8

    from __future__  import division#使除非操作自动识别小数结果

    def jia(x,y):
        return x+y

    def jian(x,y):
        return x-y

    def cheng(x,y):
        return x*y

    def chu(x,y):
        return x/y

    operator = {"+":jia,"-":jian,"*":cheng,"/":chu}

    print operator["/"](3,2)

    def f(x,o,y):
        print operator.get(o)(x,y)#类似switch函数操作

    f(3,"/",2)#函数调用
```



  
  
```