# C++ 大数阶乘求取--数组实现代码

1. 大数阶乘理论

http://blog.csdn.net/yxnk/article/details/1665052  


2. 大数阶乘实现

http://hi.baidu.com/urzalknsyzchrur/item/3934e84e821b7de31381da8d


```cpp
    #include <iostream>
    #include <cstdlib>
    #include <string>
    #include <stdio.h>

    using namespace std;

    int main(int argc, char *argv[])
    {
        int n = 0;
        cout << "Please input the number for Factorial operate : ";
        cin  >> n;

        int LargeNumberFactorial[10000] = {0};
        LargeNumberFactorial[0]    = 1;        // 0! = 1
        LargeNumberFactorial[1]    = 1;        // 第一位对应的数值初始为 1
        int          digit         = 1;        // n!阶乘求取的位数初始为 1

        for (int i = 1; i <= n; i++)           // 1,2,3,...,n
        {
            for (int j = 1; j <= digit; j++)
            {
                LargeNumberFactorial[j] *= i;
            }

            for (int j = 1; j <= digit; j++)
            {
                if (LargeNumberFactorial[j] > 10)
                {
                    for (int r = 1; r <= digit; r++)
                    {
                        if (LargeNumberFactorial[digit] > 9)
                        {
                            digit++;
                        }
                        LargeNumberFactorial[r+1] += LargeNumberFactorial[r]/10;
                        LargeNumberFactorial[r]   %= 10;
                    }
                }
            }
        }

        cout << n << "!= ";
        for (int k = digit; k > 0; k--)
        {
            cout << LargeNumberFactorial[k];
        }
        cout << endl;

        return 0;
    }
```
