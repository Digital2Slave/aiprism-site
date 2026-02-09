# Flask

## flasky


```
    $ pip install virtualenv

    $ virtualenv venv

    $ source venv/bin/activate

    $ deactivate
```



### 支持命令行选项


```
    pip install flask-script
```



### 集成twitter bootstrap


```
    pip install flask-bootstrap
```



### 本地化日期和时间


```
    pip install flask-moment
```



### web 表单


```
    pip install flask-wtf
```



### 关系型数据库


```
    pip install flask-sqlalchemy
```



### 数据库迁移


```
    pip install flask-migrate
```



### 电子邮件支持


```
    pip install flask-mail
```



默认邮箱用户和秘密设置，Mac / Linux，** _~/.bash_profile_**


```
    export MAIL_USERNAME=<Gmail username>

    export MAIL_PASSWORD=<Gmail password>
```





```
**_.bash_profile_** 立即生效：


    $ source ~/.bash_profile
```



> 引用邮箱用户和密码


```
    import os

    username = os.environ.get('MAIL_USERNAME')

    password = os.environ.get('MAIL_PASSWORD')
```
