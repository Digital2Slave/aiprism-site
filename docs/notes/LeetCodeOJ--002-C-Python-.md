# LeetCodeOJ--002(C++ && Python)

Median of Two Sorted Arrays  


There are two sorted arrays A and B of size m and n respectively. Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).  


C++版本：


```
    class Solution {

    public:
        //快速排序
        void quick_sort(vector<int> &s, int l, int r)
        {
            if (l < r)
            {
                int i = l, j = r, x = s[l];
                while (i < j)
                {
                    while(i < j && s[j] >= x) // 从右向左找第一个小于x的数
                        j--;
                    if(i < j)
                        s[i++] = s[j];

                    while(i < j && s[i] < x) // 从左向右找第一个大于等于x的数
                        i++;
                    if(i < j)
                        s[j--] = s[i];
                }
                s[i] = x;
                quick_sort(s, l, i - 1); // 递归调用
                quick_sort(s, i + 1, r);
            }
        }

    public:
        double findMedianSortedArrays(int A[], int m, int B[], int n)
        {
            if (A == NULL || B == NULL || (m <= 0 && n <= 0))
            {
                return 0.0;
            }

            vector<int> C;
            for (size_t i = 0; i < m + n; i++)
            {
                if (i < m)
                {
                    C.push_back(A[i]);
                }
                else
                {
                    C.push_back(B[i-m]);
                }
            }

            quick_sort(C, 0, m+n-1);

            double Median = 0.0;

            if ((m+n)&0x01 == 1)
            {
                Median = 1.0*C[(m+n)/2];
            }
            else
            {
                Median = 1.0*(C[(m+n-1)/2] + C[(m+n)/2])/2;
            }
            return Median;
        }
    };
```



  
Python版本： 


```python
    class Solution:
        # @return a float
        def findMedianSortedArrays(self, A, B):
            L = A + B
            L.sort()
            l = len(L)

            Median = 0.0

            if l == 0:
                return Median
            else:
                if l*0x01 == 1:
                    Median = 1.0*L[l/2]
                else:
                    Median = (L[(l-1)/2]+L[l/2])/2.0
                return Median
```



  
  


  
```