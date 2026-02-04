# Linux 查看软硬件资源

### 显卡信息


```
    ➜  ~ dmesg | grep -i vga
    [    0.000000] Console: colour VGA+ 80x25
    [    0.298474] vgaarb: device added: PCI:0000:00:02.0,decodes=io+mem,owns=io+mem,locks=none
    [    0.298477] vgaarb: loaded
    [    0.298478] vgaarb: bridge control possible 0000:00:02.0
    ➜  ~ lspci | grep -i vga
    00:02.0 VGA compatible controller: InnoTek Systemberatung GmbH VirtualBox Graphics Adapter
    ➜  ~
```



### 查看主板信息，查看主板的序列号


```
    ➜  ~ sudo dmidecode | grep -i 'serial number'
        Serial Number: 0
        Serial Number: 0
        Serial Number: Not Specified
```



### CPU信息


```
    #通过/proc文件系统
    ➜  ~ cat /proc/cpuinfo
    ➜  ~ sdmesg | grep -i cpu

    #通过查看开机信息
    ➜  ~ sudo dmidecode -t processor
    # dmidecode 2.12-dmifs
    SMBIOS 2.5 present.
```



### 硬盘信息


```
    ➜  ~ fdisk -l  # 分区情况
    ➜  ~ df -h     # 大小情况
    ➜  ~ du -h     # 使用情况
    ➜  ~ dmesg | grep sda
```



### 内存信息


```
    ➜  ~ cat /proc/meminfo
    ➜  ~ dmesg | grep mem
    ➜  ~ free -m
    ➜  ~ vmstat
    #➜  ~ dmldecode | grep -i mem
```



### 网卡信息


```
    ➜  ~ dmesg | grep -i eth
    [    1.484153] e1000 0000:00:03.0 eth0: (PCI:33MHz:32-bit) 08:00:27:48:cd:a3
    [    1.484159] e1000 0000:00:03.0 eth0: Intel(R) PRO/1000 Network Connection
    ➜  ~ lspci | grep -i eth
    00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller (rev 02)
```



### 鼠标键盘和USB信息


```
    ➜  ~ cat /proc/bus/input/devices  # 查看键盘和鼠标
    ➜  ~ cat /proc/bus/usb/devices    # 查看USB设备
    ➜  ~ cat /proc/interrupts
```



### 声卡信息


```
    ➜  ~ lspci | grep -i audio
    00:05.0 Multimedia audio controller: Intel Corporation 82801AA AC'97 Audio Controller (rev 01)
    ➜  ~ lspci -v | grep audio
    00:05.0 Multimedia audio controller: Intel Corporation 82801AA AC'97 Audio Controller (rev 01)
```



### 其他命令

`➜ ~ lspci` (显示外设备信息，如USB，网卡等信息

### 参考

  1. [linux下查看硬件资源的几个常用命令](http://blog.chinaunix.net/uid-28216282-id-3535788.html)
