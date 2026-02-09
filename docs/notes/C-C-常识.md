# C/C++常识

### 1 C语言中的数据类型

#### 1.1 基本类型

* 整型(int)
* 字符型(char)
* 实型
* 单精度实型(float)
* 双精度实型(double)


#### 1.2 构造类型

* 数组类型
* 结构类型(struct)
* 联合类型(union)
* 枚举类型(enum)


#### 1.3 指针类型

#### 1.4 空类型(无值类型) (void)

### 2 C/C++不同

#### 2.1 C/C++中新增数据类型

C/C++| 逻辑类型| 真| 假  
---|---|---|---  
C| 没有提供| 非0| 0  
C| _Bool(C99)| true| false  
C++| bool| true| false  
  
#### 2.2 C++随用随定义

  * C语言 所有变量定义必须位于函数体的最前面
  * C++ 所有变量随用随定义



#### 2.3 I/O不同

  * C语言的I/O方式



```
    * 输入过程

    输入设备->输入流->scanf->变量
```



```
    * 输出过程

    变量->printf->输出流->输出设备
```


  * C++的I/O方式



```
    * 输入过程

    输入设备->输入流->cin->变量
```



```
    * 输出过程

    变量->cout->输出流->输出设备
```


### 3 命名空间


```cpp
    #include <iostream>
    #include <stdlib.h>
    //using namespace std;
    using std::endl;
    using std::cout;
    using std::cin;
    using std::oct;
    using std::dec;
    using std::hex;
    using std::boolalpha;

    namespace A
    {
        char x = 'A';
        void fun()
        {
            cout << "A company Function" << endl;
        }
        void f2()
        {
            cout << "A company Fuction f2" << endl;
        }
    }

    namespace B
    {
        int x = 2;
        void fun()
        {
            cout << "B company Function" << endl;
        }
        void fun2()
        {
            cout << "B company Function fun2" << endl;
        }
    }
    using namespace B;


    int getMaxOrMin(int* arr, int count, bool isMax)
    {
        int temp = arr[0];
        for (int i = 1; i < count; i++)
        {
            if (isMax)
            {
                if (temp < arr[i])
                {
                    temp = arr[i];
                }
            }
            else
            {
                if (temp > arr[i])
                {
                    temp = arr[i];
                }
            }
        }

        return temp;
    }


    /**
     * 提示用户输入一个整数，8进制，10进制，16进制输出
     * 提示用户输入一个布尔值，以布尔值输出
     */
    int main(void)
    {

        // lesson 1
        cout << "-------------lesson 1-------------" << endl;
        cout << "请输入一个整数：" << endl;
        int x = 0;
        cin >> x;
        cout << oct << x << endl; // 8进制
        cout << dec << x << endl; // 10进制
        cout << hex << x << endl; // 16进制

        cout << "请输入一个布尔值(0,1):" << endl;
        bool y = false;
        cin >> y;
        cout << boolalpha << y << endl; // bool类型输出

        // lesson 2
        cout << "-------------lesson 2-------------" << endl;
        cout << A::x << endl;
        B::fun();
        B::fun2();
        fun2();            // using namespace B;

        // lesson 3
        cout << "-------------lesson 3-------------" << endl;
        int arr1[4] = {3, 5, 1, 7};
        bool isMax = false;
        cin >> isMax;
        int result = getMaxOrMin(arr1, 4, isMax);
        cout << result << endl;
        //system("pause");
        return 0;
    }
```


### 参考

  1. [C++远征之起航篇](http://www.imooc.com/learn/342)
  2. 《C Primer Plus 第五版<中文版>》
