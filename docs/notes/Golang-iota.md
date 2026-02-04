# Golang iota

### Codes


```go
    package main

    import "fmt"

    type color byte

    const (
        black color = iota
        red
        blue
    )

    func test(c color) {
        fmt.Println(c)
    }

    func main() {

        const (
            x = iota // 0
            y        // 1
            z        // 2
        )
        fmt.Printf("x=%v, y=%v, z=%v\n", x, y, z)

        const (
            _  = iota
            KB = 1 << (10 * iota) // 1 << (10 * 1)
            MB                    // 1 << (10 * 2)
            GB                    // 1 << (10 * 3)
        )
        fmt.Printf("KB=%v, MB=%v, GB=%v\n", KB, MB, GB)

        const (
            _, _   = iota, iota * 10 // 0, 0 * 10
            aa, bb                   // 1, 1 * 10
            cc, dd                   // 2, 2 * 10
        )
        fmt.Printf("aa=%v, bb=%v, cc=%v, dd=%v\n", aa, bb, cc, dd)

        const (
            a = iota // 0
            b        // 1
            c = 100  // 100
            d        // 100
            e = iota // 4
            f        // 5
        )
        fmt.Printf("a=%v, b=%v, c=%v, d=%v, e=%v, f=%v\n", a, b, c, d, e, f)

        const (
            g         = iota // 0
            h float32 = iota // 1
            i         = iota // 2
        )
        fmt.Printf("g: %T %v, f: %T %v, h: %T %v\n", g, g, h, h, i, i)

        test(black) // 0
        test(red)   // 1
        test(blue)  // 2
        test(100)   // 100 并未超出 color/byte 类型取值范围
        // xx := 2
        // test(xx)

    }
```



### Result


```
    x=0, y=1, z=2
    KB=1024, MB=1048576, GB=1073741824
    aa=1, bb=10, cc=2, dd=20
    a=0, b=1, c=100, d=100, e=4, f=5
    g: int 0, f: float32 1, h: int 2
    0
    1
    2
    100
```



### Reference

Go语言学习笔记
```