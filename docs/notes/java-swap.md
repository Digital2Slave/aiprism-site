# java swap

Question: **how to implement basic swap function in Java ?**

### Source code


```java
    package com.jt;

    /**
     * Created by Administrator on 2016/12/7.
     */
    public class TestSwap {

        private static void Swap(int[] a, int[] b) {
            int c = a[0];
            a[0] = b[0];
            b[0] = c;
        }

        public static void main(String[] args) {
            System.out.println("Hello Test");
            int[] a = {5};
            int[] b = {3};
            System.out.println("Befor swap : a[0] = " + a[0] + " b[0] = " + b[0]);
            Swap(a, b);
            System.out.println("After swap : a[0] = " + a[0] + " b[0] = " + b[0]);
        }
    }
```



### Result


```
    Hello Test
    Befor swap : a[0] = 5 b[0] = 3
    After swap : a[0] = 3 b[0] = 5
```

```