# Linux(Ubuntu)日常问题解决方法(不断更新)



```
  *     * 一 命令行安装deb包问题
    * 二 Ubuntu 系统没有声音
    * 三 SublimeText3无法输入中文
    * 四 Youdao词典安装
    * 五 JAVA安装
    * 六 Firefox Developer Edition 安装
      * 下载Firefox Developer Edition
      * 安装Firefox Developer Edition
      * 设置添加快捷方式图标
      * 参考
    * 七 Ubuntu SublimeText3 打开Windows系统文件显示中文乱码
    * 八 Ubuntu oh-my-zsh 显示Python virtualenv 名称
      * 修改
      * 验证
      * 参考
```





### 一 命令行安装deb包问题

Ubuntu 16.04 LTS直接双击安装deb包失败，使用dpkg命令安装Deb包：`sudo dpkg -i 文件名.deb`   
若安装失败，提示缺少依赖的包诸如：`fictx`，`fictx-libs等`；然后这两个包又缺少其他的包，其他的包又缺少另外的包，总之很多。



```
  * 直接键入命令：`apt-get install -f`，安装所有依赖；
  * 完成后，再执行，`sudo dpkg -i 文件名.deb`；
  * 注销系统，搞定。
```





### 二 Ubuntu 系统没有声音

参考[CSDN-Ubuntu 16.04 安装后黑屏，没有声音的解决方法 ](http://blog.csdn.net/fuchaosz/article/details/51886878)解决！

### 三 SublimeText3无法输入中文

参考[百度经验-Ubuntu下Sublime Text 3解决无法输入中文的方法](http://jingyan.baidu.com/article/f3ad7d0ff8731609c3345b3b.html)解决!

### 四 Youdao词典安装

参考[Ubuntu 16.04安装有道词典](http://www.linuxdiyf.com/linux/20622.html)。   
具体操作如下：

  1. 从官方（<http://cidian.youdao.com/index-linux.html>）下载Ubuntu版本的deb包：`youdao-dict_1.1.0-0-ubuntu_amd64.deb`
  2. 创建**youdao** 目录，把该deb包解压到**youdao** 目录：


```
         $ mkdir youdao

         $ dpkg -X ./youdao-dict_1.1.0-0-ubuntu_amd64.deb  youdao
```



  3. 解压deb包中的`control`信息(包的依赖就写在这个文件里面):


```
         $ mkdir youdao/DEBIAN

         $ dpkg -e ./youdao-dict_1.1.0-0-ubuntu_amd64.deb youdao/DEBIAN
```



  4. 编辑`control`文件，删除`Depends`里面的`gstreamer0.10-plugins-ugly`
  5. 重新打包`$ dpkg-deb -b youdao youdaobuild.deb`
  6. 安装重新打包的安装包`$ dpkg -i youdaobuild.deb`



### 五 JAVA安装

参考[Ubuntu 16.04安装Java 8](http://www.cnblogs.com/ccskun/p/5534757.html)。

### 六 Firefox Developer Edition 安装

#### 1\. 下载Firefox Developer Edition

点击[下载地址](https://www.mozilla.org/zh-CN/firefox/developer/)，进行下载。

#### 2\. 安装Firefox Developer Edition


```
    $ sudo apt-get remove firefox
    $ cd /usr/lib/
    $ sudo tar -xvf ~/Downloads/firefox-52.0a2.zh-CN.linux-x86_64.tar.bz2
    $ cd /usr/bin/
    $ sudo ln -s /usr/lib/firefox/firefox
```



#### 3\. 设置添加快捷方式图标


```
    $ cd /usr/share/applications
    $ sudo vi firefox.desktop
```



输入以下内容并保持。


```
    [Desktop Entry]
    Name=Firefox 52.0a2
    Comment=this is firefox
    Exec=/usr/lib/firefox/firefox
    Icon=/usr/lib/firefox/browser/icons/mozicon128.png
    Terminal=false
    Type=Application
    Categories=Application;Network;
```



#### 4\. 参考

  1. [ubuntu卸载并重新安装中文版mozilla firefox添加到启动器](http://blog.aizhet.com/Linux/1507.html)
  2. [Linux(ubuntu)下手动安装 firefox 6 并且添加快捷方式图标](http://blog.csdn.net/ldl22847/article/details/8268273)



### 七 Ubuntu SublimeText3 打开Windows系统文件显示中文乱码

  * package control **install** `ConvertToUTF8` plugin
  * package control **install** `Codecs33` plugin



### 八 Ubuntu oh-my-zsh 显示Python virtualenv 名称

#### 修改


```
    ➜  ~ cd ~/.oh-my-zsh/themes
    ➜  themes git:(master) ✗ sudo cp robbyrussell.zsh-theme robbyrussell.zsh-theme.bak
    ➜  themes git:(master) ✗ vim robbyrussell.zsh-theme


    function virtualenv_info {
        [ $VIRTUAL_ENV ] && echo '('`basename $VIRTUAL_ENV`')'
    }
    local ret_status="%(?:%{$fg_bold[green]%}➜ :%{$fg_bold[red]%}➜ )"
    PROMPT='${ret_status}%{$fg[cyan]%}$(virtualenv_info) %{$fg[cyan]%}%c%{$reset_color%} $(git_prompt_info)'

    ZSH_THEME_GIT_PROMPT_PREFIX="%{$fg_bold[blue]%}git:(%{$fg[red]%}"
    ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%} "
    ZSH_THEME_GIT_PROMPT_DIRTY="%{$fg[blue]%}) %{$fg[yellow]%}✗"
    ZSH_THEME_GIT_PROMPT_CLEAN="%{$fg[blue]%})"
```



#### 验证


```
    ➜  ~ workon cv
    ➜ (cv) ~
```



#### 参考

[robbyrussell](https://github.com/robbyrussell/oh-my-zsh/pull/5650/commits/22a7c9a28194e1fe6008c2ead2266f8851fec386)