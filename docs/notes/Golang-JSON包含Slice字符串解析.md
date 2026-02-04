# Golang JSON包含Slice字符串解析

#### 文章目录



```
  * JSON包含Slice字符串解析
  *     * 1\. 测试字符串
    * 2\. 源码
    * 3\. 结果
    * 4 参考
```





## JSON包含Slice字符串解析

### 1\. 测试字符串


```
    "{\"label\":\"小狗\", \"data\":[{\"X\":50,\"Y\":50,\"W\":50,\"H\":50}, {\"X\":50, \"Y\":50, \"W\":50, \"H\":100}, {\"X\":50, \"Y\":50, \"W\":100, \"H\":50}, {\"X\":50, \"Y\":50, \"W\":100, \"H\":100}]}"
```



### 2\. 源码


```go
    package main

    import (
        "encoding/json"
        "fmt"
        "math"
        "reflect"
        "strings"
    )

    type RectInfo struct {
        X float64 `json:"x"`
        Y float64 `json:"y"`
        W float64 `json:"w"`
        H float64 `json:"h"`
    }

    type DetectLabelInfo struct {
        Label string     `json:"label"`
        Data  []RectInfo `json:"data"`
    }

    func test_json_str_(raw_str string) {
        var detectLabelInfo DetectLabelInfo
        if err := json.Unmarshal([]byte(raw_str), &detectLabelInfo); err != nil {
            fmt.Printf("Unmarshal with error: %v\n", err)
        }
        t := reflect.TypeOf(detectLabelInfo)
        v := reflect.ValueOf(detectLabelInfo)
        for k := 0; k < t.NumField(); k++ {
            fmt.Printf("%s -- %v \n", t.Field(k).Name, v.Field(k).Interface())
            if v.Field(k).Kind() == reflect.Slice {
                t2 := v.Field(k).Type()
                v2 := v.Field(k)
                fmt.Println(t2.String() + " -- ")
                for i := 0; i < v2.Len(); i++ {
                    v3 := v2.Index(i)
                    fmt.Println("开始解析 第", i+1, "个矩形框...")
                    for j := 0; j < v3.NumField(); j++ {
                        kname := v3.Type().Field(j).Name
                        kvalue := v3.Field(j).Interface().(float64)
                        fmt.Printf("%s -- %v \n", kname, kvalue)
                    }
                }
            }
        }
    }

    func main() {
        raw_str := "{\"label\":\"缺角/碎裂\", \"data\":[{\"X\":50,\"Y\":50,\"W\":50,\"H\":50}, {\"X\":50, \"Y\":50, \"W\":50, \"H\":100}, {\"X\":50, \"Y\":50, \"W\":100, \"H\":50}, {\"X\":50, \"Y\":50, \"W\":100, \"H\":100}]}"
        test_json_str_(raw_str)
    }
```



### 3\. 结果


```
    ➜ go run 5image.go
    Label -- 小狗
    Data -- [{50 50 50 50} {50 50 50 100} {50 50 100 50} {50 50 100 100}]
    []main.RectInfo --
    开始解析 第 1 个矩形框...
    X -- 50
    Y -- 50
    W -- 50
    H -- 50
    开始解析 第 2 个矩形框...
    X -- 50
    Y -- 50
    W -- 50
    H -- 100
    开始解析 第 3 个矩形框...
    X -- 50
    Y -- 50
    W -- 100
    H -- 50
    开始解析 第 4 个矩形框...
    X -- 50
    Y -- 50
    W -- 100
    H -- 100
```



### 4 参考

  * [golang笔记-struct体遍历](https://blog.csdn.net/Tooth_Fairy/article/details/103203523)
  * [golang反射调用struct的方法](https://www.csdn.net/tags/NtjaEg1sOTYxNjAtYmxvZwO0O0OO0O0O.html)

```