# python 正则表达式之二

使用正则表达式  
\--re模块提供了一个正则表达式引擎的接口，可以让你将REstring编译成对象并用它们来进行匹配  
\--编译正则表达式  
#!python  
>>>import re  
>>>p = re.compile('ab*')  
>>>print p  
\--re.compile()也接受可选的标志参数，常用来实现不同的特殊功能和语法变更  
#!python  
>>>p = re.compile('ab*',re.IGNORECASE)  
\--反斜杠的麻烦  
1.字符串前加"r"反斜杠就不会被任何特殊方式处理  
\section 要匹配的字符串  
\\\section 为re.compile取消反斜杠的特殊意义  
"\\\\\section" 为"\\\section"的字符串实值(string literals)取消反斜杠的特殊意义  
\--执行匹配  
1.'RegexObject'实例有一些方法和属性，完整的列表查阅Python Library Reference  
match():决定RE是否在字符串刚开始的位置匹配  
search():扫描字符串，找到这个RE匹配的位置  
findall():找到RE匹配的所有子串，并把它们作为一个列表返回  
finditer():找到RE匹配的所有子串，并把它们作为一个迭代器返回  
如果没有匹配的话，match()和search()将返回None;否则，返回一个'MatchObject'实例。  
\--MatchObject实例方法  
group():返回RE匹配的字符串  
start():返回匹配开始的位置  
end():返回匹配结束的位置  
span():返回一个元组包含匹配(开始,结束)的位置  
实际编程中，最常用的做法是将'MatchObject'保存在一个变量里，然后检查它是否 为None.  
#!python  
p = re.compile(...)  
m = p.match('string goes here')  
if m:  
print 'Match found;',m.group()  
else:  
print 'No match'  
\--模块级函数  
1.re模块也提供了顶级函数调用如match()、search()、sub()、subn()、split()、 findall()等  
  



```
    user1@ubuntu:~$ python
    Python 2.7.3 (default, Sep 26 2013, 20:03:06)
    [GCC 4.6.3] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> import re
    >>> r1 = r"\d{3,4}-?\d{8}"
    >>> re.findall(r1,'010-12345678')
    ['010-12345678']
    >>> p_tel=re.compile(r1)
    >>> p_tel
    <_sre.SRE_Pattern object at 0x7f1469fbd810>
    >>> p_tel.findall('010-12345678')
    ['010-12345678']
    >>>
    >>> csvt_re = re.compile(r'csvt',re.I)
    >>> csvt_re.findall('CSVT')
    ['CSVT']
    >>> csvt_re.findall('csvt')
    ['csvt']
    >>> csvt_re.findall('csvT')
    ['csvT']
    >>> csvt_re.match('csvT hehe')
    <_sre.SRE_Match object at 0xc6f100>
    >>> csvt_re.match('hehe')
    >>> csvt_re.match('hehe csvT')
    >>> x = csvt_re.match('csvt hello')
    >>> if x:
    ...     pass
    ...
    >>> csvt_re.search('hehe csvT')
    <_sre.SRE_Match object at 0xc6f1d0>
    >>> csvt_re.search('hehe')
    >>> csvt_re.search('csvt heihei')
    <_sre.SRE_Match object at 0xc6f100>
    >>> csvt_re.findall('csvt csvt heihei')
    ['csvt', 'csvt']
    >>> csvt_re.finditer('csvt csvt heihei')
    <callable-iterator object at 0xc84b50>
    >>> x =csvt_re.finditer('csvt csvt heihei')
    >>> x
    <callable-iterator object at 0xc84b90>
    >>> x.next
    <method-wrapper 'next' of callable-iterator object at 0xc84b90>
    >>> csvt_re.match('csvt hello')
    <_sre.SRE_Match object at 0xc6f168>
    >>> csvt_re.match('hello')
    >>> x = csvt_re.match('csvt hello')
    >>> x
    <_sre.SRE_Match object at 0xc6f100>
    >>> x.group
    <built-in method group of _sre.SRE_Match object at 0xc6f100>
    >>> x.group()
    'csvt'
    >>> help(re.sub)

    >>> s = "hello csvt"
    >>>
    >>> s.replace('csvt','python')
    'hello python'
    >>> s
    'hello csvt'
    >>> rs = r'c..t'
    >>> re.sub(rs,'python','csvt caat cvvt cccc')
    'python python python cccc'
    >>> re.subn(rs,'python','csvt caat cvvt cccc')
    ('python python python cccc', 3)
    >>> ip = "1.2.3.4"
    >>> ip.split('.')
    ['1', '2', '3', '4']
    >>>
    >>> s = "123+456-789*000"
    >>> re.split(r'[\+\-\*]',s)
    ['123', '456', '789', '000']
    >>> dir(re)
    ['DEBUG', 'DOTALL', 'I', 'IGNORECASE', 'L', 'LOCALE', 'M', 'MULTILINE', 'S', 'Scanner', 'T', 'TEMPLATE', 'U', 'UNICODE', 'VERBOSE', 'X', '_MAXCACHE', '__all__', '__builtins__', '__doc__', '__file__', '__name__', '__package__', '__version__', '_alphanum', '_cache', '_cache_repl', '_compile', '_compile_repl', '_expand', '_pattern_type', '_pickle', '_subx', 'compile', 'copy_reg', 'error', 'escape', 'findall', 'finditer', 'match', 'purge', 'search', 'split', 'sre_compile', 'sre_parse', 'sub', 'subn', 'sys', 'template']
    >>> help(re)

    >>>
```



  
\--编译标志-flags  
DOTALL,S:使.匹配包括换行在内的所有字符  
IGNORECASE,I:使匹配对大小写不敏感  
LOCALE,L:做本地化识别(local-aware)匹配  
MULTILINE,M:多行匹配，影响^和$  
VERBOSE,X:能够使用REs的verbose状态，使之被组织的更清晰易懂  
\--分租  
"("和")"  



```
    user1@ubuntu:~$ python
    Python 2.7.3 (default, Sep 26 2013, 20:03:06)
    [GCC 4.6.3] on linux2
    Type "help", "copyright", "credits" or "license" for more information.
    >>> import re
    >>> r1 = r"csvt.net"
    >>> re.findall(r1,'csvt.ne')
    []
    >>> re.findall(r1,'csvt.net')
    ['csvt.net']
    >>> re.findall(r1,'csvtonet')
    ['csvtonet']
    >>> re.findall(r1,'csvt\nnet')
    []
    >>> re.findall(r1,'csvt\nnet',re.S)
    ['csvt\nnet']
    >>> s = """
    ... hello csvt
    ... csvt hello
    ... hello csvt hello
    ... csvt hehe
    ... """
    >>> r = r"^csvt"
    >>> re.findall(r,s)
    []
    >>> s
    '\nhello csvt\ncsvt hello\nhello csvt hello\ncsvt hehe\n'
    >>> re.findall(r,s,re.M)
    ['csvt', 'csvt']
    >>> tel = r"""
    ... ^\d{3,4}
    ... -?
    ... \d{8}$
    ... """
    >>> re.findall(tel,'010-12345678')
    []
    >>> re.findall(tel,'010-12345678',re.X)
    ['010-12345678']
    >>>
    >>> re.findall(tel,'010-12345678',re.VERBOSE)
    ['010-12345678']
    >>> email = r"^\w{3}@\w+(\.com|\.cn)"
    >>> re.match(email,'zzz@csvt.com')
    <_sre.SRE_Match object at 0x21b2558>
    >>> re.match(email,'zzz@csvt.cn')
    <_sre.SRE_Match object at 0x21b25d0>
    >>> re.match(email,'zzz@csvt.org')
    >>> re.findall(email,'zzz@csvt.com')
    ['.com']
```



  
  