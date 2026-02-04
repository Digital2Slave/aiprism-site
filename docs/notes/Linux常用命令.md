# Linux常用命令

### 1 shell命令提示符

`username@machinename:currentWorkingDirectory$`   
例如：`jt@ubuntu:~$`

### 2 命令格式

`$ 命令本身 [参数] 操作对象`

例如：


```
    ls
    ls -l
    ls -alh /etc
    mkdir -p ~/workspace/linux
    cd ~/workspace/linux
    cd ~
    rm -r ~/workspace
```



### 3 查找帮助

  * `man 命令本身`
  * `info 命令本身`



### 4 文件系统跳转



```
  * `pwd` print working directory
  * `cd` change working directory
  * `cd -` 回到之前的目录
  * `ls` 可以显示当前文件夹包含哪些文件
  * tab补齐输入内容，防止输入出错
```





### 5 文件和目录的操作

  * copy



```
    * `$ cp file1 file2`
    * `$ cp -r dir1 dir2`
  * move
```





```
    * `$ mv file ..`
    * `$ mv file dir/`
  * rename
```





```
    * `$ mv file1 file2`
    * `$ mv dir1 dir2 # dir2存在, 则为移动操作`
  * remove
```





```
    * `$ rm file`
    * `$ rm -r dir`
  * 创建文件
```





```
    * `$ touch a.txt`
    * `$ >a.txt`
  * 创建目录
```



    * `$ mkdir dir`
  * 参考文件

    * `$ cat file`
    * `$ less bigFile`

> `less`分页查看   
>  ctrl–缩小字体   
>  ctrl++增大字体   
>  :j向下滚屏   
>  :k向上滚屏   
>  /字符查找   
>  n查找下一处   
>  gg到文件头   
>  G到文件尾   
>  q退出

  * 查看文件类型

    * `file a.txt`
  * 删除文件

    * `rm filename`
  * 删除目录



```
    * `rm -r 文件夹名`
    * `rm -rf *` 删除当前文件夹内所有文件
  * 解压和打包文件
```




*.zip| *.tar.gz| *.tar.bz2
---|---|---  
{uzip zip }| { tar -zxvf tar -zcvf }| { tar -jxvf tar -jcvf}
  
解压缩：`unzip a.zip`   
压缩 ：`zip -r a/ a.zip`

解压缩：`tar zxvf a.tar.gz`   
压缩 ：`tar zcvf a.tar.gz a/`

解压缩：`tar jxvf a.tar.bz2`   
压缩 ：`tar jcvf a.tar.bz2 a/`

### 6 重定向


```
    0: stdin  # 标志输入文件
    1: stdout # 标志输出文件
    2: stderr # 标准错误输出文件
```



输出重定向，将对应的内容放入到文件中，注意，使用**>** 是覆盖，使用**> >**是追加。


```
    cat # 合并文件
    sort # 排序文件
    uniq # 报告或删除文件中的重复的行
    grep # 打印匹配行
```



例如：


```
    $ ls /bin | grep name
    # 或者:
    $ ls /bin >bin.txt
    $ grep name <bin.txt

    $ cat a.txt | uniq | grep jt | sort # 去重复后选出后缀为txt的内容排序
```





```
  * 如果终端一直需要输入文本，可以`ctrl+z`退出
  * 如果不想执行当前行 ，可以`ctrl+c`取消
  * `ctrl+a` 到行首，`ctrl+e` 到行尾
  * 复制快捷键：`ctrl+shift+c`
  * 粘贴快捷键：`ctrl+shift+v`
```





### 7 用户和文件权限



```
  * `ls -l file` 看文件的file mode
  * `ls -ld dictory` 看目录的file mode
  * `-rwxr-xr-x. 1 jt jt 157 9月 26 10:20 hello.sh
```


`

> 第一位的符号及含义：   
>  `- 常规文件`   
>  `d 目录`   
>  `b 块设备特殊（磁盘）`   
>  `c 字符特殊设备（终端）`   
>  `p 有名管道`   
>  `s 信号灯`   
>  `m 共享存储器`

owner| group| world  
---|---|---  
rwx| r-x| r-x  
111| 101| 101  
7| 5| 5  
  * `chmod` change modle



```
    * `chmod +w dictory` 加写权限
    * `chmod u+/-w/r/x file`
    * `chmod a+/-w/r/x file`
    * `chmod o+/-w/r/x file`
```


更多解释查看`man chmod`
  * `chown` change owner




### 8 进程

  * `man ps`
  * `ps aux | less`



```
    * USER：执行进程的用户标识
    * PID：进程号
  * `ps aux | grep xxx`
```





```
    1. 结束进程：kill PID
    2. 后台执行：进程 &
    3. linux总共有7个工作台
```





> 进程执行时系统卡死，`Ctrl+Alt+F1`进入第一个工作台, 执行命令杀死进程后`Ctrl+Alt+F7`返回.

例如：

> 已经执行的按`ctrl+Z`停止运行, 再加`bg`实现后台运行, 再执行`fg`返回前台,用`ctrl C`结束.


```
    $ firefox &
    $ ctrl z
    $ bg
    $ fg
```



小结：   
所有进程`ps aux | less`分页   
`alt+tab`切换   
`&`后台执行   
`ctrl+d`退出，`ctrl+c`结束，`ctrl+z`暂停   
`bg`回进程后台   
`fg`回进程前台   
`ctrl+alt+f1`切出图形界面   
`kill PID` 终止（程序有响应）   
`kill -9 PID` 杀死（程序无响应）   
`ctrl+alt+f7`回到图形化工作台   
`ctrl+shift+t`开一个新的terminal

### 9 查找

  * `locate`


    * locate 全局搜索，使用updatedb更新


> locate：用于查找文件，它比find命令的搜索速度快，它需要一个数据库，这个数据库由每天的例行工作（crontab）程序来建立，每天才更新一次，所以最近一天内更新的无法查找到，需要先进行`updatedb`（无论在那个目录中均可，可以放在crontab中）后在`/var/lib/slocate/`下生成`slocate.db`数据库即可快速查找.



```
  * `locate --regexp name`
  * `updatedb`
  * `locate 字符串`
```






```
  * `find`

        find 目录
        find . ;
        find . -type f;
        find . -type d;
        find . -type f -exec ls -l '{}' ';'
        find . -type f -exec grep -ni hello '{}' ';' -print
```



  * `grep`/`ack`

    * 字符串查找
    * [ack](http://beyondgrep.com/)

> ack 2.14 is a tool like grep, optimized for programmers.

    * [happygrep](https://github.com/happypeter/happygrep)

  * ### 10 网络操作



```
    * `ssh` 远程操作工作
    * `rsync`数据传输工具
    * `ssh`
```





```
      * openssh-server 22端口
      * openssh-client 80端口 http
      * `$ ssh-keygen` 本地生成公钥和私钥
      * `$ ssh-copy-id 服务器地址` 复制公钥到服务器
      * `$ tmux` 防止远程登录服务器时断网造成的操作丢失
      * `$ tmux -a` 恢复上次操作文件
    * `rsync`
```




      * `$ rsync -r mydir happycasts.net:` 同步本地和服务器文件


> 注意目录后面不包含斜杠，如果有斜杠表示忽略目录只拷贝内容， 且主机域名后方必须有**:**

    * `$ rsync -r happycasts.net:mydir .` 服务型下载文件到本地

### 11 安装软件

> ubuntu系统安装软件

    * 手动安装 shell默认是到PATH变量存放的地址中搜索程序
`echo $PATH`查看PATH变量的值   
如果想添加新的程序，可以直接把新程序移动到`PATH`中的任意路径中,也可以对新程序添加一个符号链接到`PATH`中的任意路径中.

编译安装一个开源软件的步骤：


```
    $ ./configure
    $ make
    $ sudo make install
```



    * deb包
DEB包中的内容：程序本身、配置文件、安装位置、依赖关系   
`$ sudo dpkg -i XXX.deb` 安装deb包   
`$ dpkg -l` 列出系统上所有安装的deb包   
`$ dpkg -s` 查询文件来自于哪个包

    * 从软件仓库安装
`$ sudo apt-get install 软件名` 安装软件   
`$ sudo apt-get remove 软件名` 删除软件   
`$ sudo apt-get purge 软件名` 删除软件，包括配置文件

### 12 脚本编程

1 指定解析器   
必须在脚本第一行指明解析器：   
`#!/usr/bin/env bash`   
指定用bash去解析下面的语句，也可以指定为python、ruby。   
`#!/usr/bin/env python`   
`#!/usr/bin/env ruby`

2 语句即命令   
命令就是语句，语句就是命令。   
脚本中可以直接罗列命令，也可以把命令包裹到函数中，通过呼叫函数名来执行。   
例： 


```
    say_hello()
    {
      echo "hello"
    }
```



输入函数名：`say_hello`   
注意：脚本语句对空格变态的敏感。 

3 位置参数   
执行脚本：`$ peter.sh a.txt b.txt`


```
    $#：代表一共有几个参数，这里为2
    $0：代表程序名，即peter.sh
    $1：代表第一个参数，即a.txt
    $2：代表第二个参数，即b.txt
```



`echo $?` 检测执行结果

4 脚本不在当前shell执行   
在shell中执行脚本，并不是在当前shell中执行，而是新开一个shell执行。   
强迫在当前目录下执行，使用`source`命令。如果指定在当前shell中执行脚本，用source命令：`source peter.sh`。

5 循环控制 重命名指定目录下文件为文件名.txt   
rename脚本： 


```
    #!/usr/bin/env bash
    cd $1
    echo I am in `pwd`
    for file in `ls`
    do
    mv $file $file.txt
    done
```



执行脚本：`./rename.sh mydir/`

6 远程执行 

`ssh -t` 登录信息 执行语句   
例如：

`ssh -t peter@happycasts.net 'touch a.txt'`

7 确认执行


```
    echo -n "Want to sync? (y/n)："
    read AAA
    if [ "${AAA:-y}" = "y" ];then
    xxx
    else
    echo Nothing done, bye.
    fi
```



8 用其他语言来写脚本

bash脚本偏机器语言不好理解，使用其他的语言更好理解一些，加上一些恰当的注释也是相当好的。

### 13 Linus Torvalds

Creator of Linux: Linus Torvalds Book: `Just for fun: The story of an accidental Revolutionary` <http://beijinglug.org/>

### 参考



```
    1. [Linux command line](http://billie66.github.io/TLCL/book/zh/index.html)
    2. [Linux Guide for Developers](http://www.imooc.com/learn/181)
    3. [happypeter](http://www.haoduoshipin.com/about)
    4. [鸟哥私房菜基础篇](http://linux.vbird.org/linux_basic/)
```


