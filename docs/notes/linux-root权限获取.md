# linux root权限获取

http://www.cnblogs.com/wuxinrui/archive/2011/03/26/1996565.html  
  
  
在终端中输入：  
sudo passwd root  
Enter new UNIX password: (在这输入你的密码）  
Retype new UNIX password: (确定你输入的密码）  
passwd: password updated successfully  
  
以后，如果在想获得root权限，只需进行如下的操作：  
su root  
Password: (在此输入你上面设置的密码）  
  
如果要再次禁用 root 帐号，  
  
那么可以执行 sudo passwd -l root 