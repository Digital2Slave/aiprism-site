# <<Python编程实践>>之Choose




```python
    #!/usr/bin/python
    #encoding:utf8

    #ph值判别程序
    print "Please input a ph value: "
    def phchoose(ph):
        '''ph value and choose acidic or basic'''
        if ph < 7.0:
            print "ph value %s is acidic." % ph
        elif ph > 7.0:
            print "ph value %s is basic." % ph
        else:
            print "ph value %s is neutral." % ph

    ph = float(raw_input())
    phchoose(ph)

    #年龄体重指数和患心脏病的关系
    #---------------年龄---
    #------------< 45    >=45
    #体重< 22.0  低      中
    #指数>=22.0  中      高

    #method_1
    def method1(age,bmi):
        if age < 45:
            if bmi < 22.0:
                return 'risk = low'
            else:
                return 'risk = medium'
        else:
            if bmi < 22.0:
                return 'risk = medium'
            else:
                return 'risk = high'

    print "Please input age and bmi: "
    age = int(raw_input())
    bmi = float(raw_input())
    print "Age %d Bmi %s" % (age,bmi),
    risk = method1(age,bmi)
    print risk

    #method_2
    def method2(age,bmi):
        young = age < 45
        slim  = bmi < 22.0
        if young:
            if slim:
                return 'risk = low'
            else:
                return 'risk = medium'
        else:
            if slim:
                return 'risk = medium'
            else:
                return 'risk = high'
    risk2 = method2(age,bmi)
    print 'method2 : ', risk2

    #method_3
    def method3(age,bmi):
        young = age < 45
        slim  = bmi < 22.0
        if young and slim:
            return 'risk = low'
        elif young and not slim:
            return 'risk = medium'
        elif not young and slim:
            return 'risk = medium'
        elif not young and not slim:
            return 'risk = high'
    risk3 = method3(age,bmi)
    print 'method3 : ',risk3

    #mehtod_4
    young = age < 45
    heavy = bmi >= 22.0
    table = [['medium','high'],['low','medium']]
    risk = table[young][heavy]
    print 'method4 :  risk =',risk
```



  
  
```