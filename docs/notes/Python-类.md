# Python 类

基于Python2.7.12的类学习。

### 1 使用class定义类


```python
    #!/usr/bin/env python
    # coding=utf-8

    class Person():
        def __init__(self, name):
            self.name = name


    if __name__ == '__main__':
        hunter = Person('JohnTian')
        print('The name of hunter:%s' %  hunter.name)
```
python


  * `__init__`Python中的特殊函数名，用于根据类的定义创建**实例对象** ，例如**hunter**

> `__init__` 并不是必需的，只有当需要区分由该类创建的不同对象时，才需要指定`__init__`方法。

  * `self`参数指向这个在被创建的对象本身，例如**hunter**




### 2 继承、覆盖和添加方法

**继承** 从已有类中衍生出新的类，添加或修改部分功能。修改得到的新方法会覆盖原有的方法。我们习惯将原始的类称为**父类、超类或基类** ，将新的类称作**孩子类、子类或衍生类** 。

#### 2.1 继承


```python
    class Car():
        def exclaim(self):
            print("I'm a car!")

    class Yugo(Car):
        pass

    baseCar = Car()
    yugoCar = Yugo()
    baseCar.exclaim()
    yugoCar.exclaim()
```



#### 2.2 覆盖方法

  * 覆盖一般方法




```python
    class Car():
        def exclaim(self):
            print("I'm a car!")

    class Bwm(Car):
        def exclaim(self):
            print("I'm a bwm car!")

    baseCar = Car()
    bwmCar = Bwm()
    baseCar.exclaim()
    bwmCar.exclaim()
```
python


  * 覆盖`__init__`方法




```python
    class Person():
        def __init__(self, name):
            self.name = name

    class MDPerson(Person):
        def __init__(self, name):
            self.name = "Doctor " + name

    class JDPerson(Person):
        def __init__(self, name):
            self.name = name + ", Esquire"

    person = Person('jt')
    doctor = MDPerson('jt')
    lawyer = JDPerson('jt')
    print person.name
    print doctor.name
    print lawyer.name
```



#### 2.3 添加方法


```python
    class Car():
        def exclaim(self):
            print("I'm a car!")


    class Yugo(Car):
        def exclaim(self):
            print "I'm a Yugo! Much like a Car, but more Yugo-ish."

        def need_a_fish(self):
            print "A little help here?"

    yugoCar = Yugo()
    yugoCar.need_a_fish()
```
python


### 3 使用**super** 从父类获取帮助


```python
    class Person(object):
        def __init__(self, name):
            self.name = name


    class EmailPerson(Person):
        def __init__(self, name, email):
            super(EmailPerson, self).__init__(name)
            # self.name = name
            self.email = email
    bob = EmailPerson('bob', 'bob@gmail.com')
    print bob.name
    print bob.email
```



### 4 类属性的访问和设置

  * 方法一(无修饰符)




```python
    class Duck(object):
        """docstring for Duck"""
        def __init__(self, input_name):
            super(Duck, self).__init__()
            self.__name = input_name

        def get_name(self):
            print 'inside the getter'
            return self.__name

        def set_name(self, input_name):
            print 'inside the setter'
            self.__name = input_name

        name = property(get_name, set_name)

    fowl = Duck('Howard')
    print fowl.name
    print fowl.get_name()
    fowl.name = 'johntian'
    print fowl.name
    fowl.set_name('jt')
    print fowl.name
```
python


  * 方法二(有修饰符)




```python
    class Duck(object):
        """docstring for Duck"""
        def __init__(self, input_name):
            super(Duck, self).__init__()
            self.__name = input_name

        @property
        def name(self):
            print 'inside the getter'
            return self.__name

        @name.setter
        def name(self, input_name):
            print 'inside the setter'
            self.__name = input_name

    fowl = Duck('Howard')
    print fowl.name
    # print fowl.get_name()
    fowl.name = 'johntian'
    print fowl.name
    # print fowl.__name # 无法在外部访问__name特性
    print fowl._Duck__name  # 可以在外部访问_Duck__name特性
```



如果没有指定某一特性的**setter** 属性(name.setter)，那么将无法从类的外部对它的值进行设置。

### 5 方法的类型

#### 5.1 实例方法

**self** 作为实例方法的第一个参数。

#### 5.2 类方法

**cls** 作为类方法的第一个参数。

#### 5.3 静态方法

由**@staticmethod** 装饰的方法。


```python
    class A(object):
        """docstring for A"""
        count = 0

        def __init__(self):
            super(A, self).__init__()
            A.count += 1

        def exclaim(self):
            print "I'm an A!"

        @classmethod
        def kids(cls):
            print "A has", cls.count, "little objects."


    class CoyoteWeapon():
        @staticmethod
        def commercial():
            print "This CoyoteWeapon has been brought to you by Acme."
    easy_a = A()
    breezy_a = A()
    wheezy_a = A()
    A.kids() # A has 3 little objects.
```
python


### 6 鸭子类型

Python采用鸭子类型实现**多态** 。


```python
    class Quote():
        def __init__(self, person, words):
            self.person = person
            self.words = words

        def who(self):
            return self.person

        def says(self):
            return self.words + '.'


    class QuestionQuote(Quote):
        def says(self):
            return self.words + '?'


    class ExclamationQuote(Quote):
        def says(self):
            return self.words + '!'


    class BabblingBrook():
        def who(self):
            return 'Brook'

        def says(self):
            return 'Babble'


    def who_says(obj):
        print obj.who(), 'says', obj.says()

    hunter = Quote("John tian", "I'm hunting wabbits")
    print hunter.who(), 'says:', hunter.says() # John tian says: I'm hunting wabbits.

    hunter1 = QuestionQuote("Bugs Bunny", "What's up, doc")
    print hunter1.who(), 'says:', hunter1.says() # Bugs Bunny says: What's up, doc?

    hunter2 = ExclamationQuote("Daffy Duck", "It's rabbit season")
    print hunter2.who(), 'says:', hunter2.says() # Daffy Duck says: It's rabbit season!

    who_says(hunter)  # John tian says I'm hunting wabbits.
    who_says(hunter1) # Bugs Bunny says What's up, doc?
    who_says(hunter2) # Daffy Duck says It's rabbit season!
    brook = BabblingBrook()
    who_says(brook)   # Brook says Babble
```



### 7 特殊方法(魔术方法)

Python中的魔术方法名称以`__`开头和结束。

`__init__`: 它根据类的定义以及传入的参数对新创建对象进行初始化。

  * 和比较相关的魔术方法

方法名称| 使用  
---|---  
`__eq__(self, other)`| self == other  
`__ne__(self, other)`| self != other  
`__lt__(self, other)`| self < other  
`__gt__(self, other)`| self > other  
`__le__(self, other)`| self <= other  
`__ge__(self, other)`| self >= other  
  
  * 和数学相关的魔术方法

方法名称| 使用  
---|---  
`__add__(self, other)`| self + other  
`__sub__(self, other)`| self - other  
`__mul__(self, other)`| self * other  
`__floordiv__(self, other)`| self // other  
`__truediv__(self, other)`| self / other  
`__mod__(self, other)`| self % other  
`__pow__(self, other)`| self ** other  
  
  * 其他种类的魔术方法

方法名称| 使用  
---|---  
`__str__(self)`| str(self)  
`__repr__(self)`| repr(self)  
`__len__(self)`| len(self)  
  
`__str__`: 用于定义如何打印信息   
`__repr__`: 交互式解释器输出变量

  * 测试




```python
    class Word():
        def __init__(self, text):
            self.text = text

        def __eq__(self, word2):
            return self.text.lower() == word2.text.lower()

        def __str__(self):
            return self.text

        def __repr__(self):
            return 'Word("' + self.text + '")'

    first = Word('ha')
    second = Word('HA')
    third = Word('eh')
    print first == second
    print first == third
    # first
    print first
```
python


### 8 组合(聚合)

继承子类和父类之间的关系是`is-a`的关系，实际操作中，子类对象还需要`has-a`关系。   
例如：一只鸭子(**子类**)是鸟(**父类**)的一种(**is-a**)，它有一条尾巴(**has-a**)。


```python
    class Bill():
        def __init__(self, description):
            self.description = description


    class Tail():
        def __init__(self, length):
            self.length = length


    class DuckA():
        def __init__(self, bill, tail):
            self.bill = bill
            self.tail = tail

        def about(self):
            print 'This ducka has a ' + self.bill.description + ' bill and a ' + \
                self.tail.length + ' tail.'


    tail = Tail('long')
    bill = Bill('wide orange')
    ducka = DuckA(bill, tail)
    ducka.about() # This ducka has a wide orange bill and a long tail.
```



### 9 何时使用类和对象而不是模块

  *



```
  * 当需要许多具有相似行为(方法)，但不同状态(特性属性)的实例时，使用对象是最好的选择。
  * 类支持继承，模块不支持。
  * 如果想要保证模块的**唯一性** ，使用模块是最好的选择。
  * 如果有一系列包含多个值的变量，并且它们能作为参数传入不同的函数，那么最好将它们封装到类里面。
  * 用最简单的方式解决问题。
```






> 使用**字典、列表和元组** 往往要比使用模块更加简单、简洁且快速，使用类则更复杂。 

### 10 命名元组

命名元组是元组的子类，你既可以通过名称(`.name`)来访问其中的值，也可以通过位置进行访问(`[offset]`)。

使用`nametuple`函数来创建命名元组：   
\+ 名称   
\+ 由多个域名组成的字符串，各个域名之间由空格隔开

使用命名元组之前需要加载相关模块，即`from collections import nametuple`。


```
    from collections import nametuple
    # 命名元组名称：DuckT
    # 命名元组域名1：bill
    # 命名元组域名2：tail
    DuckT = namedtuple('DuckT', 'bill tail')
    duckt = DuckT('wide orange', 'long')
    print duckt       # DuckT(bill='wide orange', tail='long')
    print duckt.bill  # wide orange
    print duckt.tail  # long

    # 使用字典构建命名元组
    parts = {'bill': 'wide orange', 'tail': 'long'}
    # 关键词变量：**parts
    duck2 = DuckT(**parts)
    print duck2 # DuckT(bill='wide orange', tail='long')

    # 命名元组是不可变的，但是可以替换其中某些域名的值并返回一个新的命名元组
    duck3 = duck2._replace(tail='magnificent', bill='crushing')
    print duck3 # DuckT(bill='crushing', tail='magnificent')
```



小结命名元组的优点：

  1. 它无论看起来还是用起来都和不可变对象非常相似；
  2. 与使用对象相比，使用命名元组在时间和空间上效率更高；
  3. 可以使用点好(`.`)对特性进行访问，而不需要使用字典风格的方括号；
  4. 可以把它作为字典的**键** 。



### 11 实例

#### 11.1 源码


```python
    # coding=utf-8
    from collections import namedtuple


    class Person(object):
        def __init__(self, name):
            self.name = name


    class EmailPerson(Person):
        def __init__(self, name, email):
            super(EmailPerson, self).__init__(name)
            # self.name = name
            self.email = email


    class MDPerson(Person):
        def __init__(self, name):
            self.name = "Doctor " + name


    class JDPerson(Person):
        def __init__(self, name):
            self.name = name + ", Esquire"


    class Car():
        def exclaim(self):
            print("I'm a car!")


    class Yugo(Car):
        def exclaim(self):
            print "I'm a Yugo! Much like a Car, but more Yugo-ish."

        def need_a_fish(self):
            print "A little help here?"


    class Bwm(Car):
        def exclaim(self):
            print("I'm a bwm car!")


    class Duck(object):
        """docstring for Duck"""
        def __init__(self, input_name):
            super(Duck, self).__init__()
            self.__name = input_name

        @property
        def name(self):
            print 'inside the getter'
            return self.__name

        @name.setter
        def name(self, input_name):
            print 'inside the setter'
            self.__name = input_name

        # def get_name(self):
        #     print 'inside the getter'
        #     return self.__name

        # def set_name(self, input_name):
        #     print 'inside the setter'
        #     self.__name = input_name

        # name = property(get_name, set_name)


    class A(object):
        """docstring for A"""
        count = 0

        def __init__(self):
            super(A, self).__init__()
            A.count += 1

        def exclaim(self):
            print "I'm an A!"

        @classmethod
        def kids(cls):
            print "A has", cls.count, "little objects."


    class CoyoteWeapon():
        @staticmethod
        def commercial():
            print "This CoyoteWeapon has been brought to you by Acme."


    class Quote():
        def __init__(self, person, words):
            self.person = person
            self.words = words

        def who(self):
            return self.person

        def says(self):
            return self.words + '.'


    class QuestionQuote(Quote):
        def says(self):
            return self.words + '?'


    class ExclamationQuote(Quote):
        def says(self):
            return self.words + '!'


    class BabblingBrook():
        def who(self):
            return 'Brook'

        def says(self):
            return 'Babble'


    def who_says(obj):
        print obj.who(), 'says', obj.says()


    class Word():
        def __init__(self, text):
            self.text = text

        def __eq__(self, word2):
            return self.text.lower() == word2.text.lower()

        def __str__(self):
            return self.text

        def __repr__(self):
            return 'Word("' + self.text + '")'


    class Bill():
        def __init__(self, description):
            self.description = description


    class Tail():
        def __init__(self, length):
            self.length = length


    class DuckA():
        def __init__(self, bill, tail):
            self.bill = bill
            self.tail = tail

        def about(self):
            print 'This ducka has a ' + self.bill.description + ' bill and a ' + \
                self.tail.length + ' tail.'


    if __name__ == '__main__':
        # 类定义
        print '*' * 30, '类定义 ', '*' * 30
        hunter = Person('JohnTian')
        print 'The name of hunter:%s' % hunter.name

        # 继承
        print '*' * 30, ' 继承 ', '*' * 30
        baseCar = Car()
        yugoCar = Yugo()
        baseCar.exclaim()
        yugoCar.exclaim()

        # 覆盖方法
        print '*' * 30, '覆盖方法', '*' * 30
        bwmCar = Bwm()
        baseCar.exclaim()
        bwmCar.exclaim()
        person = Person('jt')
        doctor = MDPerson('jt')
        lawyer = JDPerson('jt')
        print person.name
        print doctor.name
        print lawyer.name

        # 添加新方法
        print '*' * 30, '添加新方法', '*' * 30
        yugoCar.need_a_fish()

        # super
        print '*' * 30, 'super父类方法', '*' * 30
        bob = EmailPerson('bob', 'bob@gmail.com')
        print bob.name
        print bob.email

        print '*' * 30, '类属性的访问和设置', '*' * 30
        fowl = Duck('Howard')
        print fowl.name
        # print fowl.get_name()
        fowl.name = 'johntian'
        print fowl.name
        # fowl.set_name('jt')
        print fowl.name
        # print fowl.__name  # 无法在外部访问__name特性
        print fowl._Duck__name  # 可以在外部访问_Duck__name特性

        print '*' * 30, '方法的类型', '*' * 30
        easy_a = A()
        breezy_a = A()
        wheezy_a = A()
        A.kids()

        print '*' * 30, '鸭子类型', '*' * 30
        hunter = Quote("John tian", "I'm hunting wabbits")
        print hunter.who(), 'says:', hunter.says()

        hunter1 = QuestionQuote("Bugs Bunny", "What's up, doc")
        print hunter1.who(), 'says:', hunter1.says()

        hunter2 = ExclamationQuote("Daffy Duck", "It's rabbit season")
        print hunter2.who(), 'says:', hunter2.says()

        who_says(hunter)
        who_says(hunter1)
        who_says(hunter2)
        brook = BabblingBrook()
        who_says(brook)

        print '*' * 30, '魔术方法', '*' * 30
        first = Word('ha')
        second = Word('HA')
        third = Word('eh')
        print first == second
        print first == third
        # first
        print first

        print '*' * 30, '组合(聚合)', '*' * 30
        tail = Tail('long')
        bill = Bill('wide orange')
        ducka = DuckA(bill, tail)
        ducka.about()

        print '*' * 30, '命名元组', '*' * 30
        # 命名元组名称：DuckT
        # 命名元组域名1：bill
        # 命名元组域名2：tail
        DuckT = namedtuple('DuckT', 'bill tail')
        duckt = DuckT('wide orange', 'long')
        print duckt
        print duckt.bill
        print duckt.tail

        # 使用字典构建命名元组
        parts = {'bill': 'wide orange', 'tail': 'long'}
        # 关键词变量：**parts
        duck2 = DuckT(**parts)
        print duck2

        # 命名元组是不可变的，但是可以替换其中某些域名的值并返回一个新的命名元组
        duck3 = duck2._replace(tail='magnificent', bill='crushing')
        print duck3
```



#### 11.2 输出


```
    ****************************** 类定义  ******************************
    The name of hunter:JohnTian
    ******************************  继承  ******************************
    I'm a car!
    I'm a Yugo! Much like a Car, but more Yugo-ish.
    ****************************** 覆盖方法 ******************************
    I'm a car!
    I'm a bwm car!
    jt
    Doctor jt
    jt, Esquire
    ****************************** 添加新方法 ******************************
    A little help here?
    ****************************** super父类方法 ******************************
    bob
    bob@gmail.com
    ****************************** 类属性的访问和设置 ******************************
    inside the getter
    Howard
    inside the setter
    inside the getter
    johntian
    inside the getter
    johntian
    johntian
    ****************************** 方法的类型 ******************************
    A has 3 little objects.
    ****************************** 鸭子类型 ******************************
    John tian says: I'm hunting wabbits.
    Bugs Bunny says: What's up, doc?
    Daffy Duck says: It's rabbit season!
    John tian says I'm hunting wabbits.
    Bugs Bunny says What's up, doc?
    Daffy Duck says It's rabbit season!
    Brook says Babble
    ****************************** 魔术方法 ******************************
    True
    False
    ha
    ****************************** 组合(聚合) ******************************
    This ducka has a wide orange bill and a long tail.
    ****************************** 命名元组 ******************************
    DuckT(bill='wide orange', tail='long')
    wide orange
    long
    DuckT(bill='wide orange', tail='long')
    DuckT(bill='crushing', tail='magnificent')
    [Finished in 0.1s]
```



### 参考

Python语言及其应用 第六章
```