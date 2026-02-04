# Golang 判断当前时间为当天范围内时间

利用Golang中的time库实现当前时间是否为当天范围内时间的判断。


```go
    package main

    import (
        "fmt"
        "time"
    )
    func main() {
        format := "2006-01-02 15:04:05"
        sqlUpdatedAt, _ := time.ParseInLocation(format, "2021-03-24 15:00:00", time.Local)
        fmt.Println("测试时间:", sqlUpdatedAt)

        t := time.Now()
        t_zero := time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location())
        fmt.Println("当天凌晨时间:", t_zero)

        t_ := sqlUpdatedAt.Sub(t_zero)
        fmt.Println("测试时间到当天凌晨时间:", t_)
        if t_ > 0 {
            fmt.Println("未超有效时间!!!")
        } else {
            fmt.Println("超过有效时间!!!")
        }
        fmt.Println("-------------------------------------")

        // 测试超时情况
        h, _ := time.ParseDuration("+24h")
        t_zero = t_zero.Add(h)
        fmt.Println("次天凌晨时间:", t_zero)
        t_ = sqlUpdatedAt.Sub(t_zero)
        fmt.Println("测试时间到当天凌晨时间:", t_)
        if t_ > 0 {
            fmt.Println("未超有效时间!!!")
        } else {
            fmt.Println("超过有效时间!!!")
        }
    }
```



输出结果


```
    测试时间: 2021-03-24 15:00:00 +0800 CST
    当天凌晨时间: 2021-03-24 00:00:00 +0800 CST
    测试时间到当天凌晨时间: 15h0m0s
    未超有效时间!!!
    -------------------------------------
    次天凌晨时间: 2021-03-25 00:00:00 +0800 CST
    测试时间到当天凌晨时间: -9h0m0s
    超过有效时间!!!
```

```