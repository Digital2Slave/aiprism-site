# Python2.7 unicode encoding gbk error

最近因为需要用python抓取网页的信息，遇到了python中最头痛的字符编码问题。

**伪Unicode** 字符串： `u'\xe6\x97\xa0\xe7\xba\xbfWLAN\xef\xbc\x9a'`

### 解决套路

#### 方法一


```python
    In[2]: s = u'\xe6\x97\xa0\xe7\xba\xbfWLAN\xef\xbc\x9a'
    In[3]:print s
    æ— çº¿WLANï¼š
    In[4]: s.encode('gbk', 'ignore')
    Out[4]: 'WLAN'
    In[5]: s.encode('gbk')
    Traceback (most recent call last):
      File "C:\ProgramData\Anaconda2\lib\site-packages\IPython\core\interactiveshell.py", line 2881, in run_code
        exec(code_obj, self.user_global_ns, self.user_ns)
      File "<ipython-input-5-6b7f8e9c6ceb>", line 1, in <module>
        s.encode('gbk')
    UnicodeEncodeError: 'gbk' codec can't encode character u'\xe6' in position 0: illegal multibyte sequence
    In[6]: import sys
    In[7]: sys.getdefaultencoding()
    Out[7]: 'ascii'
    In[8]: reload(sys)
    <module 'sys' (built-in)>
    In[9]: sys.setdefaultencoding('utf-8')
    In[10]: s
    Out[10]: u'\xe6\x97\xa0\xe7\xba\xbfWLAN\xef\xbc\x9a'
    In[11]: s.encode('gbk', 'ignore')
    Out[11]: 'WLAN'
    In[12]: s.encode('gbk')
    Traceback (most recent call last):
      File "C:\ProgramData\Anaconda2\lib\site-packages\IPython\core\interactiveshell.py", line 2881, in run_code
        exec(code_obj, self.user_global_ns, self.user_ns)
      File "<ipython-input-12-6b7f8e9c6ceb>", line 1, in <module>
        s.encode('gbk')
    UnicodeEncodeError: 'gbk' codec can't encode character u'\xe6' in position 0: illegal multibyte sequence
    In[13]: ## 解决方案
    In[14]: s
    Out[14]: u'\xe6\x97\xa0\xe7\xba\xbfWLAN\xef\xbc\x9a'
    In[15]: print s.encode('raw_unicode_escape')
    无线WLAN：
```



#### 方法二


```
    In[2]: import sys
    In[3]: sys.getdefaultencoding()
    Out[3]: 'ascii'
    In[4]: s= u'\xe6\x97\xa0\xe7\xba\xbfWLAN\xef\xbc\x9a'
    In[5]: print s.encode('raw_unicode_escape')
    无线WLAN：
```



### 参考

  * [python-raw-unicode](https://mozillazg.github.io/2013/12/python-raw-unicode.html)

```