# #define #ifdef #endif

最近在用C语写一些程序，发现#ifdef,#else,#endif和#ifndef,#else,#endif在UCOS-II中有大量的应用，于是到网上查了一些相关的解释. #ifdef的用法 

灵活使用#ifdef指示符，我们可以区隔一些与特定头文件、程序库和其他文件版本有关的代码。  
代码举例：新建define.cpp文件

＃include "iostream.h"   
int main()
{
#ifdef DEBUG   
cout<< "Beginning execution of main()";   
#endif   
return 0;
}
运行结果为：Press any key to continue   
  
改写代码如下：   
＃include "iostream.h"   


```
**#define DEBUG**
int main()
{
```


#ifdef DEBUG   
cout<< "Beginning execution of main()";   
#endif   
return 0;
}
运行结果为：Beginning execution of main()   
Press any key to continue 

更一般的情况是，#define语句是包含在一个特定的头文件中。  
比如，新建头文件head.h，在文件中加入代码：

#ifndef DEBUG  
#define DEBUG  
#endif

而在define.cpp源文件中，代码修改如下：   
＃include "iostream.h"   
**＃include "head.h"
**int main(){
#ifdef DEBUG   
cout<< "Beginning execution of main()";   
#endif   
return 0;
}
运行结果如下：Beginning execution of main()   
Press any key to continue   
结论：通过使用#ifdef指示符，我们可以区隔一些与特定头文件、程序库和其他文件版本有关的代码。 

  
"#ifdef"的运用： 

  


"#ifdef"在C++中运用 常常在建立header file的时候需要先写一段文字   
比如下面这段话   
  


> #ifdef HEADERFILENAME_H   
>    
>  #define HEADERFILENAME_H   
>    
>  class ClassName   
>    
>  {   
>    
>  ...   
>    
>  };   
>    
>  #endif 

那段#ifdef有必要写吗?   
  
其实有些无写都不会影响代码的Runtime   
  
不过对运行速度和文件大小有一定的影响   
  
大概很多人很喜欢用＃i nclude来抓取文件吧   
  
炎也很喜欢   
  
总是在main.cpp中include一次   
  
然后又在classfile.cpp中又使用一次   
  
每次都include同样的Headerfile.h   
  
这样就导致了Compiler运作的时候在link的时候会重复同样的headerfile内容   
  
相同重复的内容出现就有可能导致不良的情况的发生   
  
即时没有compilerError或者RunrimeError   
  
也会让程序运行缓慢,想想看吧,在重复compiler一段Code之后产生的程序大小   
预处理命令之条件编译（#ifdef,#else,#endif,#if等） 

预处理就是在进行编译的第一遍词法扫描和语法分析之前所作的工作。说白了，就是对源文件进行编译前，先对预处理部分进行处理，然后对处理后的代码进行编译。这样做的好处是，经过处理后的代码，将会变的很精短。  
关于预处理命令中的文件包含（＃i nclude），宏定义（#define），书上已经有了详细的说明，在这里就不详述了。这里主要是对条件编译（#ifdef,#else,#endif,#if等）进行说明。以下分3种情况：

1：情况1：  
#ifdef _XXXX  
...程序段1...  
#else  
...程序段2...  
#endif  
这表明如果标识符_XXXX已被#define命令定义过则对程序段1进行编译；否则对程序段2进行编译。

例：   
#define NUM  
.............  
.............  
.............  
#ifdef NUM  
printf("之前NUM有过定义啦！:) \n");  
#else  
printf("之前NUM没有过定义！:( \n");  
#endif  
}
如果程序开头有#define NUM这行，即NUM有定义，碰到下面#ifdef NUM的时候，当然执行第一个printf。否则第二个printf将被执行。  
我认为，用这种，可以很方便的开启/关闭整个程序的某项特定功能。

  
2:情况2：   
#ifndef _XXXX   
...程序段1...   
#else   
...程序段2...   
#endif  
这里使用了#ifndef，表示的是if not def。当然是和#ifdef相反的状况（如果没有定义了标识符_XXXX，那么执行程序段1，否则执行程序段2）。例子就不举了。

  
3：情况3：  
#if 常量   
...程序段1...  
#else  
...程序段2...  
#endif   
这里表示，如果常量为真（非0，随便什么数字，只要不是0），就执行程序段1，否则执行程序段2。  
我认为，这种方法可以将测试代码加进来。当需要开启测试的时候，只要将常量变1就好了。而不要测试的时候，只要将常量变0。

# ifdef #ifndef 等用法

文件中的#ifndef 

头件的中的#ifndef，这是一个很关键的东西。比如你有两个C文件，这两个C文件都include了同一个头文件。而编译时，这两个C文件要一同编译成一个可运行文件，于是问题来了，大量的声明冲突。

还是把头文件的内容都放在#ifndef和#endif中吧。不管你的头文件会不会被多个文件引用，你都要加上这个。一般格式是这样的：

#ifndef <标识>   
#define <标识>

......   
......

#endif

<标识>在理论上来说可以是自由命名的，但每个头文件的这个“标识”都应该是唯一的。标识的命名规则一般是头文件名全大写，前后加下划线，并把文件名中的“.”也变成下划线，如：stdio.h

#ifndef _STDIO_H_   
#define _STDIO_H_

......

#endif

2.在#ifndef中定义变量出现的问题（一般不定义在#ifndef中）。

#ifndef AAA  
#define AAA  
...  
int i;
...  
#endif  
里面有一个变量定义  
在vc中链接时就出现了i重复定义的错误，而在c中成功编译。

结论：

(1).当你第一个使用这个头的.cpp文件生成.obj的时候，int i 在里面定义了当另外一个使用这个的.cpp再次[单独]生成.obj的时候，int i 又被定义然后两个obj被另外一个.cpp也include 这个头的，连接在一起，就会出现重复定义.

(2).把源程序文件扩展名改成.c后，VC按照C语言的语法对源程序进行编译，而不是C++。在C语言中，若是遇到多个int i，则自动认为其中一个是定义，其他的是声明。

(3).C语言和C++语言连接结果不同，可能（猜测）时在进行编译的时候，C++语言将全局  
变量默认为强符号，所以连接出错。C语言则依照是否初始化进行强弱的判断的。（参考）

解决方法：

(1).把源程序文件扩展名改成.c。

(2).推荐解决方案：  
.h中只声明 extern int i;在.cpp中定义

<x.h>  
#ifndef __X_H__  
#define __X_H__  
extern int i;  
#endif //__X_H__  
<x.c>  
int i;

注意问题：

变量一般不要定义在.h文件中。

  


转自：<http://hi.baidu.com/taney/item/a5d8690c31301525a0312dac>  