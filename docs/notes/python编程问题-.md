# python编程问题...

﻿﻿ 

[http://blog.csdn.net/andoring/article/details/6624533?userName=tianzhaixing&userInfo=G5u2fzPlc%2F2H71lAJmMqCi5eBGxw9oOFzBMd3FF18Aw2cRkO2fzWXYMW2sRF62Kh8jp9LNioxLa4jTKPbMzO4NwTk7LMNKqf4Q0vVRwu%2B0P4de739azkXg590zgWv5m6dwiX9JLsZn6Osc7ufGlHnw%3D%3D](http://blog.csdn.net/andoring/article/details/6624533?userName=tianzhaixing&userInfo=G5u2fzPlc%2F2H71lAJmMqCi5eBGxw9oOFzBMd3FF18Aw2cRkO2fzWXYMW2sRF62Kh8jp9LNioxLa4jTKPbMzO4NwTk7LMNKqf4Q0vVRwu%2B0P4de739azkXg590zgWv5m6dwiX9JLsZn6Osc7ufGlHnw%3D%3D)

python xml处理中文时出现的错误，记录一下，以免忘记

"UnicodeDecodeError: 'ascii' codec can't decode byte 0xe9 in position 0: ordinal not in range(128)"  
  
解决办法，在该python文件的前面加上如下几句，问题得到解决。  
  
import sys  
default_encoding = 'utf-8'  
if sys.getdefaultencoding() != default_encoding:  
**reload(sys)
sys.setdefaultencoding(default_encoding)**