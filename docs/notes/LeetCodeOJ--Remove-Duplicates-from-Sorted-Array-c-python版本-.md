# LeetCodeOJ--Remove Duplicates from Sorted Array(c++ && python版本)

####  Remove Duplicates from Sorted Array

Given a sorted array, remove the duplicates in place such that each element appear only once and return the new length.

Do not allocate extra space for another array, you must do this in place with constant memory.

For example,

Given input array A = `[1,1,2]`,

Your function should return length = `2`, and A is now `[1,2]`.

C++版本：AC


```
    class Solution {
    public:
        int removeDuplicates(int A[], int n) {
            if(A == NULL || n <=0)
            { return 0;}

            // 非STL版本 时间复杂度O(n), 空间复杂度O(1)
            //int index = 0;
            //for(int i = 1; i < n; i++)
            //{
            //    if(A[index] != A[i])
            //    {
            //        A[++index] = A[i];
            //    }
            //}
            //return index + 1;

            // STL版本 时间复杂度O(n), 空间复杂度O(1)
            return distance(A, unique(A, A+n));
        }
    };
```



  
2.python版本AC


```python
    class Solution:
        # @param a list of integers
        # @return an integer
        def removeDuplicates(self, A):
            L = len(A)
            if L <= 0:
                return 0
            j = 0

            for i in range(1,L):
                if A[j] != A[i]:
                    j = j+1
                    A[j] = A[i]

            return j+1
```



  
  
```