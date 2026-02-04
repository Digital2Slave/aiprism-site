# #ifndef #endif

#ifndef AAA  
{
int a;
#endif  
int b;
int c;
#ifndef AAA  
}
#endif  
如果预编译此代码之前出现过  
#define AAA  
编译器这样编译：  
int b;
int c;
否则如果没有定义过AAA,即没出现过#define AAA，编译器这样编译：  


```
{
int a;
int b;
int c;
}
```


具体是#define什么，自己随便啦。 记住预编译只看以#开头的那条，其他的包括什么语法什么的，编译链接时候处理。 