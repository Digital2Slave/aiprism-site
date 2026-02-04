# Mysql

### Mac 安装 MySQL


```
    brew update
    brew install mysql
```



### 安装MySQL-Python


```
    pip install MySQL-Python
```



### 启动&关闭MySQL


```
    mbp:~ tianzhaixing$ which mysql
    /usr/local/bin/mysql
    mbp:~ tianzhaixing$ cd /usr/local/bin
    mbp:bin tianzhaixing$ ./mysqld_safe &
    [1] 11985

    mbp:bin tianzhaixing$
    151219 10:29:06 mysqld_safe Logging to '/usr/local/var/mysql/mbp.local.err'.
    151219 10:29:06 mysqld_safe Starting mysqld daemon with databases from /usr/local/var/mysql


    mbp:bin tianzhaixing$ pwd
    /usr/local/bin
    mbp:bin tianzhaixing$ ./mysqladmin -u root -p shutdown
    Enter password:
    151219 10:29:36 mysqld_safe mysqld from pid file /usr/local/var/mysql/mbp.local.pid ended
    [1]+  Done                    ./mysqld_safe
```



注意：

> Enter password: 有时候直接回车就可以。如果不行，再输入密码。   
>  使用Python 链接MySQL前，要先启动MySQL；   
>  使用后，再关闭MySQL。

**Question:**

> Can’t connect to local MySQL server through socket ‘/tmp/mysql.sock’ (2)   
>  Answer:


```
    $ mysql.server start
```



…