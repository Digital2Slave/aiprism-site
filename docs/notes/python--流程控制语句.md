# python--流程控制语句

python流程控制语句

python使用缩进作为其语句分组的方法，建议使用4个空格代替缩进。

  


(1)if语句：

if expression:

statement(s)

  


expression:逻辑值，主要用于判断语句中，用来判断

\-- 一个字符串是否为空

\-- 一个运算结果是否为零

\-- 一个表达式是否可用

  


(2)if else语句：

if expression:

statement(s)

else:

statement(s)

  


(3)elif语句：

if expression1:

statement(s)

elif expression2:

statement(s)

elif expression3:

statements(s)

else:

statement(s)

(4)嵌套的if…elif…else构造

if expression1:

statement(s)

if expression2:

statement(s)

else: 

statements(s)

else:

statement(s)

(5)逻辑运算符and or not 结合if else语句进行多条件判断

  



```python
    #!/usr/bin/python

    def fun():
        return 0

    x = int(raw_input("please input x :"))
    y = int(raw_input("please input y :"))

    if x>=90 and y>=90:
        print "A"
    elif x>=80:
        print "B"
    elif x>=70:
        print "C"
    else:
        print "bad"
    ~
```



  


(6) for循环

for iterating_var in sequence:

statement(s)

range(i,j,[步进值])

\--如果所创建的对象为整数，可用range

\--i为初始数值

\--j为终止数值，但是不包括在范围内，步进值为可选参数，默认为1

\--i默认为0


```
    #！/usr/bin/python
    import time

    s="hello"
    t=(7,8,9,'x','y')
    l=[1,2,3,'a','b']
    d={1:111,2:222,5:555,3:333}

    for x in range(1,11):
        print x
        time.sleep(1)
    else:
        print "ending"

    for x in d:
        print d[x]
    else:
        print "ending"

    for k,v in d.items():
        print k
        print v
    else:
        print "ending"

    for x in l:
        print x
    else:
        print "ending"

    for x in range(len(s)):
        print s[x]
    else:
        print "ending"


    for x in range(1,11):
        print x
        if x == 3:
            pass #代码桩
        if x == 2:
            print "hello 2"
            continue
        if x == 5:
            exit() #退出程序
        if x == 6:
            break
        print "#"*50 #打印50个#
    else:
        print "ending" #程序正常结束运行else后的代码


    for x in range(1,11):
        print "------------>",x
```



  
  


(7)while 循环

while expression:

statement(s)


```
    #！/usr/bin/python

    x = ""

    while x != "q":
        print "hello"
        x = raw_input("please input something,q for quit:)
        if not x：
            break
        if x == "c":
            continue
        print "one more time---"
    else:
        print "ending......"
```



  
  
```