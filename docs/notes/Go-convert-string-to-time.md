# Go convert string to time

本文主要以代码实例的形式，说明了Golang语言中，time对象和string对象之间的转换。

### 源码


```go
    package main

    import (
        "fmt"
        "reflect"
        "time"
    )

    func main() {

        fmt.Println("----------------当前时间/时间戳/字符串----------------")
        t := time.Now()
        timestamp := t.Unix()
        fmt.Println("当前本时区时间：", t)
        fmt.Println("当前本时区时间时间戳：", timestamp)

        t = time.Now().UTC()
        timestamp = t.Unix()
        fmt.Println("当前零时区时间：", t)
        fmt.Println("当前零时区时间时间戳：", timestamp)
        fmt.Println("当前时间对应字符串：", t.Format("2006-01-02 15:04:05"))

        fmt.Println("")

        fmt.Println("------指定字符串后，字符串和时间戳之间的相互转换------")
        // 字符串-->时间戳
        // 方法一
        the_time := time.Date(2017, 7, 7, 9, 0, 0, 0, time.Local)
        unix_time := the_time.Unix()
        fmt.Println("方法一 时间戳：", unix_time, reflect.TypeOf(unix_time))

        // 方法二
        the_time, err := time.ParseInLocation("2006-01-02 15:04:05", "2017-07-07 09:00:00", time.Local)
        if err == nil {
            unix_time = the_time.Unix()
            fmt.Println("方法二 时间戳：", unix_time, reflect.TypeOf(unix_time))
        }

        // 时间戳--> 字符串
        res := time.Unix(unix_time, 0).Format("2006-01-02 15:04:05")
        fmt.Println("时间戳对应字符串：", res, reflect.TypeOf(res))
    }
```



### 运行结果


```
    ----------------当前时间/时间戳/字符串----------------
    当前本时区时间： 2017-07-07 09:22:13.4999002 +0800 CST
    当前本时区时间时间戳： 1499390533
    当前零时区时间： 2017-07-07 01:22:13.5219002 +0000 UTC
    当前零时区时间时间戳： 1499390533
    当前时间对应字符串： 2017-07-07 01:22:13

    ------指定字符串后，字符串和时间戳之间的相互转换------
    方法一 时间戳： 1499389200 int64
    方法二 时间戳： 1499389200 int64
    时间戳对应字符串： 2017-07-07 09:00:00 string
```



### 参考

  1. [golang 常用时间处理示例](http://www.golangnote.com/topic/12.html)
  2. [golang/pkg/time](https://golang.org/pkg/time/)

```