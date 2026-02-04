# 《剑指offer》学习之--顺时针打印矩阵




```
    #include "stdafx.h"

    void PrintMatrixInCircle(int** numbers, int columns, int rows, int start);
    void printNumber(int number);

    void PrintMatrixClockwisely(int** numbers, int columns, int rows)
    {
        if(numbers == NULL || columns <= 0 || rows <= 0)
            return;

        int start = 0;

        // 5x5矩阵时,最后一圈只有一个坐标为(2,2)的数字,5>2x2;
        // 6x6矩阵时,最后一圈有四个数字,其左上角的坐标为(2,2), 6>2x2;
        // 故columns > start * 2 && rows > start * 2
        while(columns > start * 2 && rows > start * 2)
        {
            PrintMatrixInCircle(numbers, columns, rows, start);

            ++start;
        }
    }

    void PrintMatrixInCircle(int** numbers, int columns, int rows, int start)
    {
        int endX = columns - 1 - start;
        int endY = rows - 1 - start;

        // 从左到右打印一行
        for(int i = start; i <= endX; ++i)
        {
            int number = numbers[start][i];
            printNumber(number);
        }

        // 从上到下打印一列
        if(start < endY)
        {
            for(int i = start + 1; i <= endY; ++i)
            {
                int number = numbers[i][endX];//endX列, start+1到endY行
                printNumber(number);
            }
        }

        // 从右到左打印一行
        if(start < endX && start < endY)
        {
            for(int i = endX - 1; i >= start; --i)
            {
                int number = numbers[endY][i];//endY行, endX-1到start列
                printNumber(number);
            }
        }

        // 从下到上打印一行
        if(start < endX && start < endY - 1)
        {
            for(int i = endY - 1; i >= start + 1; --i)
            {
                int number = numbers[i][start];//start列, endY-1到start+1行
                printNumber(number);
            }
        }
    }

    void printNumber(int number)
    {
        printf("%d\t", number);
    }

    // ====================测试代码====================
    void Test(int columns, int rows)
    {
        printf("Test Begin: %d columns, %d rows.\n", columns, rows);

        if(columns < 1 || rows < 1)
            return;

        int** numbers = new int*[rows];// 二维数组用到二维指针
        for(int i = 0; i < rows; ++i)
        {
            numbers[i] = new int[columns];//每一行开辟columns列int类型内存空间
            for(int j = 0; j < columns; ++j)
            {
                numbers[i][j] = i * columns + j + 1;//i行j列数据赋值为从1开始的int类型数据
            }
        }

        PrintMatrixClockwisely(numbers, columns, rows);// 顺时针循环打印矩阵中数据
        printf("\n");

        for(int i = 0; i < rows; ++i)
            delete[] (int*)numbers[i];//释放每一行的int内存空间

        delete[] numbers;//释放二维数组的int*内存空间
    }

    int _tmain(int argc, _TCHAR* argv[])
    {
        /*
        1
        */
        Test(1, 1);

        /*
        1    2
        3    4
        */
        Test(2, 2);

        /*
        1    2    3    4
        5    6    7    8
        9    10   11   12
        13   14   15   16
        */
        Test(4, 4);

        /*
        1    2    3    4    5
        6    7    8    9    10
        11   12   13   14   15
        16   17   18   19   20
        21   22   23   24   25
        */
        Test(5, 5);

        /*
        1
        2
        3
        4
        5
        */
        Test(1, 5);

        /*
        1    2
        3    4
        5    6
        7    8
        9    10
        */
        Test(2, 5);

        /*
        1    2    3
        4    5    6
        7    8    9
        10   11   12
        13   14   15
        */
        Test(3, 5);

        /*
        1    2    3    4
        5    6    7    8
        9    10   11   12
        13   14   15   16
        17   18   19   20
        */
        Test(4, 5);

        /*
        1    2    3    4    5
        */
        Test(5, 1);

        /*
        1    2    3    4    5
        6    7    8    9    10
        */
        Test(5, 2);

        /*
        1    2    3    4    5
        6    7    8    9    10
        11   12   13   14    15
        */
        Test(5, 3);

        /*
        1    2    3    4    5
        6    7    8    9    10
        11   12   13   14   15
        16   17   18   19   20
        */
        Test(5, 4);

        return 0;
    }
```



  


声明：以上源码著作权归《剑指offer》作者何海涛所有，详细内容，可以查阅书籍内容。或者，浏览何大神的blog: http://zhedahht.blog.163.com/