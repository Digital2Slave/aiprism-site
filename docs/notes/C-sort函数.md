# C++ sort函数

 sort函数: `#include <algorithm>`，默认从小到大，如果降序可写第三方函数进行排序，EXP:sort(array,array+n,cmp)


1.普通排序,升序


```cpp
    #include <iostream>
    #include <algorithm>
    using namespace std;
    int main()
    {
     int a[10]={7,3,4,6,5,1,2,9,8,0};
     sort(a,a+10);
     for(int i=0;i<10;i++)
     cout<<a[i]<<" ";
     return 0;
    }
    OUTPUT:0 1 2 3 4 5 6 7 8 9
```

  
普通排序,降序   


```cpp
    #include <iostream>
    #include <algorithm>
    using namespace std;
    bool cmp(int a,int b)
    {
     return a>b;
    }
    int main()
    {
     int a[10]={7,3,4,6,5,1,2,9,8,0};
     sort(a,a+10,cmp);
     for(int i=0;i<10;i++)
     cout<<a[i]<<" ";
     return 0;
    }
    OUTPUT:9 8 7 6 5 4 3 2 1 0
```

  
2.结构体排序，a升,b降,c降   


```cpp
    #include <iostream>
    #include <algorithm>
    using namespace std;
    struct data
    {
     int a;
     int b;
     int c;
    };
    bool cmp(data x,data y)
    {
     if(x.a!=y.a) return x.a<x.y;
     if(x.b!=y.b) return x.b>y.b;
     if(x.c!=y.c) return x.c>y.c;
    }
    int main()
    {
     .....
     sort(array,array+n,cmp);
     return 0;
    }
```


转载自[C/C++程序员之家](http://www.cplusplus.me/)

**本文链接地址:** [sort函数](http://www.cplusplus.me/265.html)
