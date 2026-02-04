# python 正则表达式之一

正则表达式(或RE)是一个小型高度专业化的编程语言，它内嵌于python中，并通过re模块实现。  
\--可以为想要匹配的相应字符串集指定规则  
\--该字符串集可能包含英文语句、e-mail地址、命令或者任何你想搞定的信息  
\--可以问诸如“这个字符串匹配该模式么？”或“在这个字符串中是否有部分匹配该模式？”  
\--你也可以使用RE以各种方式修改或者切割字符串  
  
  
1）正则表达式模块被编译成一系列的字节码，然后由用C编写的匹配引擎执行  
2）正则表达式语言相对小型和受限（功能有限）  
\--并非所有字符串处理都能用正则表达式完成  
  
  
1#字符匹配  
\--普通字符  
1.大多数字母和字符一般都会和自身匹配  
2.如正则表达式test会和字符串"test"完全匹配  
\--元字符  
. ^ $ * + ? {} [] \ | ()  
1.[]  
\--常用来指定一个字符集：[abc];[a-z]  
\--元字符在字符集合不起作用：[akm$]  
\--补集匹配不在区间范围的字符：[^5]  
2.^  
\--匹配首行。除非设置MULTILINE标志，它只是匹配字符串的开始。在MULTILINE里，它也可以直接匹配字符串中的每个换行。  
3.$  
\--匹配行尾。行尾被定义为要么是字符串尾，要么是一个换行字符后面的任何位置。  
  
  



```
    user1@ubuntu:~$ python
    Python 2.7.3 (default, Sep 26 2013, 20:03:06)
    [GCC 4.6.3] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> import re
    >>> s = 'abc'
    >>> s =r'abc'
    >>> re.findall(s,"aaaaa")
    []
    >>> re.findall(s,"aaaaabc")
    ['abc']
    >>> re.findall(s,"abcaaaabc")
    ['abc', 'abc']
    >>>
    >>> st = "top tip tqp twp tep"
    >>> res = r"top"
    >>> re.findall(res,st)
    ['top']
    >>> res = r"tip"
    >>> re.findall(res,st)
    ['tip']
    >>> res = r"t[io]p"
    >>> re.findall(res,st)
    ['top', 'tip']
    >>> res = r"t[^io]p"
    >>> re.findall(res,st)
    ['tqp', 'twp', 'tep']
    >>>


    user1@ubuntu:~$ python
    Python 2.7.3 (default, Sep 26 2013, 20:03:06)
    [GCC 4.6.3] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> s="hello world,hello girl"
    >>> r=r"hello"
    >>> re.findall(r,s)
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    NameError: name 're' is not defined
    >>> import re
    >>> s="hello world,hello girl"
    >>> r=r"hello"
    >>> re.findall(r,s)
    ['hello', 'hello']
    >>> r=r"^hello"
    >>> re.findall(r,s)
    ['hello']
    >>> s="world,hello girl"
    >>> r=r"^hello"
    >>> re.findall(r,s)
    []
    >>> r=r"girl$"
    >>> re.findall(r,s)
    ['girl']
    >>> r = "t[abc$]"
    >>> re.findall(r,'ta')
    ['ta']
    >>> re.findall(r,'tb')
    ['tb']
    >>> re.findall(r,'tax')
    ['ta']
    >>> re.findall(r,'t$')
    ['t$']
    >>> r = "t[abc^]"
    >>> re.findall(r,'t^')
    ['t^']
    >>> r = r"x[0123456789]x"
    >>> re.findall(r,'x1x x2x')
    ['x1x', 'x2x']
    >>> r = r"x[0-9]x"
    >>> re.findall(r,'x1x x2x')
    ['x1x', 'x2x']
    >>> r = r"x[a-zA-Z0-9]x"
    >>> re.findall(r,'x1x x2x')
    ['x1x', 'x2x']
    >>>
```



  
4.\  
\--反斜杠后面可以加不同的字符以表示不同特殊意义  
\--也可以用于取消所有的元字符：\\[或者\\\  
\d 匹配任何十进制数；它相当于类[0-9]  
\D 匹配任何非数字字符；它相当于类[^0-9]  
\s 匹配任何空白字符；它相当于类[\t\n\r\f\v]  
\S 匹配任何非空白字符；它相当于类[^\t\n\r\f\v]  
\w 匹配任何字母数字字符；它相当于类[a-zA-Z0-9]  
\W 匹配任何非字母数字字符；它相当于类[^a-zA-Z0-9]  
  
5.重复  
\--正则表达式第一功能是能够匹配不定长的字符集，另一个功能是可以指定正则表达式 的一部分重复次数  
6.*  
\--指定前个字符可以被匹配0次或更多次，而不只是只有一次。匹配引擎会试着重复尽可能多的次数（不超过整数界定范围，20亿）  
\--a[bcd]*b--"abcdd"  
7.+  
\--表示匹配1次或者更多次。注意*和+的不同：*匹配0次或更多次，所以可以根本就不出现，而+则要求至少出现1次  
8.？  
\--匹配1次或0次；你可以认为它用于标识某事物是可选的  
9.{m,n}  
\--其中m和n是十进制整数。该限定符的意思是至少有m个重复，至多有n个重复。  
a/{1,3}b  
\--忽略m会认为下边界是0，而忽略n的结果将是上边界无穷大(实际是20亿)  
\--{0,}等同于*,{1,}等同于+，而{0,1}则与？相同。如果可以的话，最好使用*，+，？  
  
  



```
    user1@ubuntu:~$ python
    Python 2.7.3 (default, Sep 26 2013, 20:03:06)
    [GCC 4.6.3] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> r = r"^abc"
    >>> import re
    >>> re.findall(r,'abc')
    ['abc']
    >>> re.findall(r,'^abc')
    []
    >>> re.findall(r,'^abc ^abc ^abc')
    []
    >>> r = r"\^abc"
    >>> re.findall(r,'^abc ^abc ^abc')
    ['^abc', '^abc', '^abc']
    >>> r = r"[0-9]"
    >>> re.findall(r,'1234567890')
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    >>> r = r"\d"
    >>> re.findall(r,'1234567890')
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    >>> 010-12345678
    -12345670
    >>> r=r"^010-\d\d\d\d\d\d\d\d"
    >>> re.findall(r,'010-8765432')
    []
    >>> re.findall(r,'010-87654321')
    ['010-87654321']
    >>> r=r"^010-\d{8}"
    >>> re.findall(r,'010-87654321')
    ['010-87654321']
    >>> r=r"^010-a{8}"
    >>> re.findall(r,'010-aaaaaaaa')
    ['010-aaaaaaaa']
    >>> r = r"ab*"
    >>> re.findall(r,'a')
    ['a']
    >>> re.findall(r,'ab')
    ['ab']
    >>> re.findall(r,'abbbbbbbbbbbb')
    ['abbbbbbbbbbbb']
    >>> r = r"ab+"
    >>> re.findall(r,'a')
    []
    >>> re.findall(r,'ab')
    ['ab']
    >>> re.findall(r,'abbbbbbbbbbbb')
    ['abbbbbbbbbbbb']
    >>> r=r"^010-*\d{8}$"
    >>> re.findall(r,'010-12345678')
    ['010-12345678']
    >>> re.findall(r,'01012345678')
    ['01012345678']
    >>> re.findall(r,'010--12345678')
    ['010--12345678']
    >>> r=r"^010-?\d{8}$"
    >>> re.findall(r,'010-12345678')
    ['010-12345678']
    >>> re.findall(r,'01012345678')
    ['01012345678']
    >>> r=r"ab+"
    >>> re.findall(r,'abbbbbbbbb')
    ['abbbbbbbbb']
    >>> r=r"ab+?"
    >>> re.findall(r,'abbbbbbbbb')
    ['ab']
    >>> r=r"a{1,3}"
    >>> re.findall(r,'a')
    ['a']
    >>> re.findall(r,'aa')
    ['aa']
    >>> re.findall(r,'aaa')
    ['aaa']
    >>> re.findall(r,'aaaa')
    ['aaa', 'a']
    >>>
```



  
  