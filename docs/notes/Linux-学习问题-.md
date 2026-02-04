# Linux 学习问题...

刚装了CentOS6.5操作系统，安装完毕后只能在“命令行模式”下登陆，无法进入“图形化界面”。电脑内存：512M，并且该系统是安装在Oracle Virtualbox虚拟机上安装的。默认选项没有选择好！！！解决方案如下：  
(1)在“命令行模式下”以root身份进入系统  
(2)用Vi编辑器对相关文件进行编辑：#vi /etc/inittab  
(3)将其中的：init：3修改为：init:5  
(4)保存并退出：:wq  
(5)重新启动系统：#reboot

http://bbs.csdn.net/topics/370008075?page=1  


  