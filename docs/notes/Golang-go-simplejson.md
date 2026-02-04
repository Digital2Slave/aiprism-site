# Golang go-simplejson

### Source code

[go-simplejson](https://github.com/bitly/go-simplejson)

a Go package to interact with arbitrary JSON.

#### Install


```
    go get -u github.com/bitly/go-simplejson
```



#### Import


```
    import "github.com/bitly/go-simplejson"
```



### Demo


```go
    package main

    import (
        "fmt"

        simplejson "github.com/bitly/go-simplejson"
    )

    func main() {
        js, err := simplejson.NewJson([]byte(`
      {
        "test": {
          "string_array": ["asdf", "ghjk", "zxcv"],
          "array": [1, "2", 3],
          "arraywithsubs": [{"subkeyone": 1}, {"subkeytwo": 2, "subkeythree": 3}],
          "int": 10,
          "float": 5.150,
          "bignum": 9223372036854775807,
          "string": "simplejson",
          "bool": true
        },
        "person": [
                    {
                      "name": "piao",
                      "age": 30,
                      "email": "piaoyunsoft@163.com",
                      "phoneNum": ["13974999999","13984999999"]
                    },
                    {
                      "name": "aaaaa",
                      "age": 20,
                      "email": "aaaaaa@163.com",
                      "phoneNum": ["13974998888","13984998888"]
                    }
        ]
      }
      `))
        if err != nil {
            panic("json format error")
        }
        fmt.Println("\n")

        // get some field
        fmt.Println("---------------------get some field-----------------")
        s, err := js.Get("test").Get("string").String()
        if err != nil {
            panic(err)
        }
        fmt.Println(s, "\n")

        // check existence of some field
        fmt.Println("---------------------check existence----------------")
        _, ok := js.Get("test").CheckGet("string2")
        if ok {
            fmt.Println("exist!")
        } else {
            fmt.Println("not exist!")
        }
        fmt.Println("\n")

        // array
        fmt.Println("---------------------array--------------------------")
        arr, err := js.Get("test").Get("string_array").StringArray()
        fmt.Println("# array of string")
        if err != nil {
            panic(err)
        }
        for _, v := range arr {
            fmt.Printf("%s\t", v)
        }
        fmt.Println("\n")

        fmt.Println("# array of number and string")
        arr2, err := js.Get("test").Get("array").Array()
        if err != nil {
            panic(err)
        }
        for _, v := range arr2 {
            fmt.Printf("%T:%v\t", v, v)
        }
        fmt.Println("\n")

        fmt.Println("# array of map")
        arr3 := js.Get("test").Get("arraywithsubs").GetIndex(1).MustMap()
        fmt.Printf("%v\t", arr3)
        fmt.Printf("%v", arr3["subkeytwo"])
        fmt.Println("\n")

        //
        fmt.Println("# array of json")
        personArr, err := js.Get("person").Array()
        fmt.Printf("Number of person: %d\n", len(personArr))

        // Loop
        fmt.Println("\t# Loop person")
        for i, _ := range personArr {
            person := js.Get("person").GetIndex(i)
            name := person.Get("name").MustString()
            age := person.Get("age").MustInt()
            email := person.Get("email").MustString()

            fmt.Printf("\tname=%s, age=%d, email=%s\n", name, age, email)

            // get Phone number
            fmt.Println("\t# Loop phone number")
            phoneNumArr, _ := person.Get("phoneNum").Array()
            for ii, vv := range phoneNumArr {
                fmt.Println("\t", ii, vv)
            }
        }
    }
```





```
**Output:**


    ---------------------get some field-----------------
    simplejson

    ---------------------check existence----------------
    not exist!


    ---------------------array--------------------------
    # array of string
    asdf    ghjk    zxcv

    # array of number and string
    json.Number:1   string:2    json.Number:3

    # array of map
    map[subkeytwo:2 subkeythree:3]  2

    # array of json
    Number of person: 2
        # Loop person
        name=piao, age=30, email=piaoyunsoft@163.com
        # Loop phone number
         0 13974999999
         1 13984999999
        name=aaaaa, age=20, email=aaaaaa@163.com
        # Loop phone number
         0 13974998888
         1 13984998888
```



### Reference

  1. [go-simplejson|解析json字符串测试](http://www.dllhook.com/post/183.html)
  2. [Golang–Simplejson简单实例](http://www.cnblogs.com/bvac/p/6293667.html)
  3. [go-simplejson](https://godoc.org/github.com/bitly/go-simplejson)

```