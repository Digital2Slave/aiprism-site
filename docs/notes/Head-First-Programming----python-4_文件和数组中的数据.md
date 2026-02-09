# 《Head First Programming》---python 4_文件和数组中的数据

本章主要是利用数组(python中是指代列表)和python内置函数sort实现对指定文本中的数据进行排序和显示。

文本result.txt中的数据如下所示：

```txt
Johnny 8.65  
Juan 9.12  
Joseph 8.45  
Stacey 7.81  
Aideen 8.05  
Zack 7.21  
Aaron 8.31
```

1.实现代码：


```python
    scores = [] #空列表
    result_f = open("result.txt")
    for line in result_f:
        (name, score) = line.split()
        scores.append(float(score))
    result_f.close()

    scores.sort()#降序排序
    scores.reverse()#反序排序

    print("The top scores were : ")
    print(scores[0])
    print(scores[1])
    print(scores[2])
```



2.实现结果：


```python
    Python 3.3.5 (v3.3.5:62cf4e77f785, Mar  9 2014, 10:37:12) [MSC v.1600 32 bit (Intel)] on win32
    Type "copyright", "credits" or "license()" for more information.
    >>> ================================ RESTART ================================
    >>>
    The top scores were :
    9.12
    8.65
    8.45
    >>>
```

但是没有关联名称和数值...


3.利用hash(python里值字典)实现名称和数据的关联

hash实现代码如下：


```python
    scores = {} #hash空表
    result_f = open("result.txt")
    for line in result_f:
        (name, score) = line.split()
        scores[score] = name
    result_f.close()

    print("The top scores were : ")

    for each_score in sorted(scores.keys(), reverse = True):
        print('Surfer ' + scores[each_score] + ' scored ' + each_score)
```

4.实现结果：


```python
    Python 3.3.5 (v3.3.5:62cf4e77f785, Mar  9 2014, 10:37:12) [MSC v.1600 32 bit (Intel)] on win32
    Type "copyright", "credits" or "license()" for more information.
    >>> ================================ RESTART ================================
    >>>
    The top scores were :
    Surfer Juan scored 9.12
    Surfer Johnny scored 8.65
    Surfer Joseph scored 8.45
    Surfer Aaron scored 8.31
    Surfer Aideen scored 8.05
    Surfer Stacey scored 7.81
    Surfer Zack scored 7.21
    >>>
```
