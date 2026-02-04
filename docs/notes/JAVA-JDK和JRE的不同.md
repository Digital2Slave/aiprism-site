# JAVA-JDK和JRE的不同




```
    http://zhidao.baidu.com/question/55791862.html



    简单的说JDK是面向开发人员使用的SDK，它提供了Java的开发环境和运行环境。SDK是Software Development Kit 一般指软件开发包，可以包括函数库、编译程序等。


    JDK就是Java Development Kit
    JRE是Java Runtime Enviroment是指Java的运行环境，是面向Java程序的使用者，而不是开发者。

    如果安装了JDK，会发同你的电脑有两套JRE，一套位于 \jre 另外一套位于 C:\Program Files\Java\j2re1.4.1_01 目录下，后面这套比前面那套少了Server端的Java虚拟机，不过直接将前面那套的Server端Java虚拟机复制过来就行了。而且在安装JDK可以选择是否安装这个位于 C:\Program Files\Jav a 目录下的JRE。如果你只安装JRE，而不是JDK，那么只会在 C:\Program Files\Java 目录下安装唯一的一套JRE。

    JRE的地位就象一台PC机一样，我们写好的 Win32应用程序需要操作系统帮我们运行，同样的，我们编写的Java程序也必须要JRE才能运行。所以当你装完JDK后，如果分别在硬盘上的两个不同地方安装了两套JRE，那么你可以想象你的电脑有两台虚拟的Java PC机，都具有运行Java程序的功能。所以我们可以说，只要你的电脑安装了JRE，就可以正确运行Jav a应用程序。

    1、为什么Sun要让JDK安装两套相同的JRE？这是因为JDK里面有很多用Java所编写的开发工具（如javac.exe、jar.exe等），而且都放置在 \lib\tools.jar 里。从下面例子可以看出，先将tools.jar改名为tools1.jar，然后运行javac.exe，显示如下结果： Exception in thread "main" java.lang.NoClassDefFoundError: com/sun/tools/javac /Main 这个意思是说，你输入javac.exe与输入 java -cp c:\jdk\lib\tools.jar com.sun.tools.javac.Main 是一样的，会得到相同的结果。从这里我们可以证明javac.exe只是一个包装器（Wrapper），而制作的目的是为了让开发者免于输入太长的指命。而且可以发现\lib目录下的程序都很小，不大于2 9K，从这里我们可以得出一个结论。就是JDK里的工具几乎是用Java所编写，所以也是Java应用程序，因此要使用JDK所附的工具来开发Java程序，也必须要自行附一套JRE才行，所以位于C:\Program Files\Java目录下的那套JRE就是用来运行一般Java程序用的。

    2、如果一台电脑安装两套以上的JRE，谁来决定呢？这个重大任务就落在java.exe身上。Java.exe的工作就是找到合适的JRE来运行 Java程序。 Java.exe依照底下的顺序来查找JRE：自己的目录下有没有JRE；父目录有没有JRE；查询注册表： [HKEY_LOCAL_MACHINE\SOFTWARE\JavaSoft\Java Runtime Environment] 所以java.exe的运行结果与你的电脑里面哪个JRE被执行有很大的关系。

    3、介绍JVM JRE目录下的Bin目录有两个目录：server与client。这就是真正的jvm.dll所在。 jvm.dll无法单独工作，当jvm.dll启动后，会使用explicit的方法（就是使用Win32 API之中的LoadLibrary()与GetProcAddress()来载入辅助用的动态链接库），而这些辅助用的动态链接库（.dll）都必须位于jvm.dll所在目录的父目录之中。因此想使用哪个JVM，只需要设置PATH，指向JRE所在目录底下的jvm.dll。
```
