# golang simplejson 学习

#### golang simplejson 学习



```
  *     * 1 源码
    * 2 输出
    * 3 参考
```





### 1 源码


```go
    package main

    import (
        "encoding/json"
        "fmt"
        "reflect"
        "strconv"

        simplejson "github.com/bitly/go-simplejson"
    )

    var jsonStr = `{
      "msg" : "Success",
      "result" : {
        "timeline" : {
          "rows" : [ {
            "startTs" : 1528434707000,
            "number" : "x12887"
          }, {
            "startTs" : 1528434720000,
            "number" : "x13028"
          }, {
            "startTs" : 1528434721000,
            "number" : "x12975"
          }],
          "total" : 803254
        }
      }
    }`

    func main() {

        res, err := simplejson.NewJson([]byte(jsonStr))

        if err != nil {
            fmt.Printf("%v\n", err)
            return
        }
        // 未包含的key, 赋予默认值
        val := res.Get("company").MustString("example.com")
        fmt.Println(val)

        //获取json字符串中的 result 下的 timeline 下的 rows 数组
        rows, err := res.Get("result").Get("timeline").Get("rows").Array()

        //遍历rows数组
        for _, row := range rows {
            //对每个row获取其类型，每个row相当于 C++/Golang 中的map、Python中的dict
            //每个row对应一个map，该map类型为map[string]interface{}，也即key为string类型，value是interface{}类型
            if eachMap, ok := row.(map[string]interface{}); ok {

                //可以看到eachMap["startTs"]类型是json.Number
                //而json.Number是golang自带json库中decode.go文件中定义的: type Number string
                //因此json.Number实际上是个string类型
                fmt.Println(reflect.TypeOf(eachMap["startTs"]))

                if startTs, ok := eachMap["startTs"].(json.Number); ok {
                    startTsInt, err := strconv.ParseInt(string(startTs), 10, 0)
                    if err == nil {
                        fmt.Println(startTsInt)
                    }
                }

                if number, ok := eachMap["number"].(string); ok {
                    fmt.Println(number)
                }

                fmt.Println()
            }
        }
    }
```



### 2 输出


```
    ➜  ~ go run go_demo.go
    example.com
    json.Number
    1528434707000
    x12887

    json.Number
    1528434720000
    x13028

    json.Number
    1528434721000
    x12975

    ➜  ~
```



### 3 参考

[golang使用simplejson库解析复杂json](https://www.cnblogs.com/pluse/p/9157599.html)
```