# go-tour (2)

继[go-tour (1)](http://blog.csdn.net/tianzhaixing2013/article/details/52938401)之后，整理go-tour教程中，有关go语言的方法、接口和并行。

### 3 方法和接口

#### 3.1 方法

Go没有类。不过你可以为结构体类型定义方法。   
方法就是一类带特殊的 接收者 参数的函数。   
方法接收者在它自己的参数列表内，位于 func 关键字和方法名之间。   
在此例中， Abs 方法拥有一个名为 v ，类型为 Vertex 的接收者。

  * methods.go




```go
    package main

    import (
        "fmt"
        "math"
    )

    type Vertex struct {
        X, Y float64
    }

    func (v Vertex) Abs() float64 {
        return math.Sqrt(v.X*v.X + v.Y*v.Y)
    }

    func main() {
        v := Vertex{3, 4}
        fmt.Println(v.Abs()) // 5
    }
```
go


##### 3.1.1 方法即函数

记住：方法只是个带接收者参数的函数。   
现在这个 Abs 的写法就是个正常的函数，功能并没有什么变化。

  * methods-funcs.go




```go
    package main

    import (
        "fmt"
        "math"
    )

    type Vertex struct {
        X, Y float64
    }

    func Abs(v Vertex) float64 {
        return math.Sqrt(v.X*v.X + v.Y*v.Y)
    }

    func main() {
        v := Vertex{3, 4}
        fmt.Println(Abs(v)) // 5
    }
```



##### 3.1.2 方法（续）

你也可以为**非结构体类型** 声明方法。   
在此例中，我们看到了一个带 Abs 方法的数值类型 MyFloat 。   
你只能为在同一包内定义的类型的接收者声明方法， 而不能为其它包内定义的类型（包括 int 之类的内建类型）的接收者声明方法。   
**（译注：就是接收者的类型定义和方法声明必须在同一包内；不能为内建类型声明方法。）**

  * methods-continued.go




```go
    package main

    import (
        "fmt"
        "math"
    )

    type MyFloat float64

    func (f MyFloat) Abs() float64 {
        if f < 0 {
            return float64(-f)
        }
        return float64(f)
    }

    func main() {
        f := MyFloat(-math.Sqrt2)
        fmt.Println(f.Abs()) // 1.4142135623730951
    }
```
go


##### 3.1.3 指针接收者

你可以为指针接收者声明方法。

这意味着对于某类型 T ，接收者的类型可以用 *T 的文法。 （此外， T 不能是像 *int 这样的指针。）

例如，这里为 *Vertex 定义了 Scale 方法。   
指针接收者的方法可以修改接收者指向的值（就像 Scale 在这做的）。 由于方法经常需要修改它的接收者，指针接收者比值接收者更常用。

若使用值接收者，那么 Scale 方法会对原始 Vertex 值的副本进行操作。 （对于函数的其它参数也是如此。） Scale 方法必须用指针接受者来更改 main 函数中声明的 Vertex 的值。

  * methods-pointers.go




```go
    package main

    import (
        "fmt"
        "math"
    )

    type Vertex struct {
        X, Y float64
    }

    func (v Vertex) Abs() float64 {
        return math.Sqrt(v.X*v.X + v.Y*v.Y)
    }

    func (v *Vertex) Scale(f float64) {
        v.X = v.X * f
        v.Y = v.Y * f
    }

    func main() {
        v := Vertex{3, 4}
        v.Scale(10)
        fmt.Println(v.Abs()) // 50
    }
```



##### 3.1.4 指针与函数

现在我们要把 Abs 和 Scale 方法重写为函数

  * methods-pointers-explained.go




```go
    package main

    import (
        "fmt"
        "math"
    )

    type Vertex struct {
        X, Y float64
    }

    func Abs(v Vertex) float64 {
        return math.Sqrt(v.X*v.X + v.Y*v.Y)
    }

    func Scale(v *Vertex, f float64) {
        v.X = v.X * f
        v.Y = v.Y * f
    }

    func main() {
        v := Vertex{3, 4}
        Scale(&v, 10)
        fmt.Println(Abs(v)) // 50
    }
```
go


  * methods-pointers-explained-1.go




```go
    package main

    import (
        "fmt"
        "math"
    )

    type Vertex struct {
        X, Y float64
    }

    func Abs(v Vertex) float64 {
        return math.Sqrt(v.X*v.X + v.Y*v.Y)
    }

    func Scale(v *Vertex, f float64) {
        v.X = v.X * f
        v.Y = v.Y * f
    }

    func main() {
        v := Vertex{3, 4}
        p := &v
        Scale(p, 10)
        fmt.Println(Abs(v)) // 50
    }
```



##### 3.1.5 方法与指针重定向

比较前两个程序，你大概会注意到带指针参数的函数必须接受一个指针：


```
    var v Vertex
    ScaleFunc(v)  // 编译错误！
    ScaleFunc(&v) // OK
```



而以指针为接收者的方法被调用时，接收者既能为值又能为指针：


```
    var v Vertex
    v.Scale(5)  // OK
    p := &v
    p.Scale(10) // OK
```



对于语句 v.Scale(5) ，即便 v 是个值而非指针，带指针接收者的方法也能被直接调用。 也就是说，由于 Scale 方法有一个指针接收者，为方便起见，Go 会将语句 v.Scale(5) 解释为 (&v).Scale(5) 。

  * indirection.go




```go
    package main

    import "fmt"

    type Vertex struct {
        X, Y float64
    }

    func (v *Vertex) Scale(f float64) {
        v.X = v.X * f
        v.Y = v.Y * f
    }

    func ScaleFunc(v *Vertex, f float64) {
        v.X = v.X * f
        v.Y = v.Y * f
    }

    func main() {
        v := Vertex{3, 4}
        v.Scale(2)
        ScaleFunc(&v, 10)

        p := &Vertex{4, 3}
        p.Scale(3)
        ScaleFunc(p, 8)

        fmt.Println(v, p)
    }
```



##### 3.1.6 方法与指针重定向（续）

同样的事情也发生在相反的方向。

接受一个值作为参数的函数必须接受一个指定类型的值：


```
    var v Vertex
    fmt.Println(AbsFunc(v))  // OK
    fmt.Println(AbsFunc(&v)) // 编译错误！
```



而以值为接收者的方法被调用时，接收者既能为值又能为指针：


```
    var v Vertex
    fmt.Println(v.Abs()) // OK
    p := &v
    fmt.Println(p.Abs()) // OK
```
go


这种情况下，方法调用 p.Abs() 会被解释为 (*p).Abs() 。

  * indirection-values.go




```go
    package main

    import (
        "fmt"
        "math"
    )

    type Vertex struct {
        X, Y float64
    }

    func (v Vertex) Abs() float64 {
        return math.Sqrt(v.X*v.X + v.Y*v.Y)
    }

    func AbsFunc(v Vertex) float64 {
        return math.Sqrt(v.X*v.X + v.Y*v.Y)
    }

    func main() {
        v := Vertex{3, 4}
        fmt.Println(v.Abs()) // 5
        fmt.Println(AbsFunc(v)) // 5

        p := &Vertex{4, 3}
        fmt.Println(p.Abs()) // 5
        fmt.Println(AbsFunc(*p)) // 5
    }
```



##### 3.1.7 选择值或指针作为接收者

使用指针接收者的原因有二：

首先，方法能够修改其接收者指向的值。   
其次，这样可以避免在每次调用方法时复制该值。若值的类型为大型结构体时，这样做会更加高效。

在本例中， Scale 和 Abs 接收者的类型为 *Vertex ，即便 Abs 并不需要修改其接收者。

> 通常来说，所有给定类型的方法都应该有值或指针接收者，但并不应该二者混用。 

  * methods-with-pointer-receivers.go




```go
    package main

    import (
        "fmt"
        "math"
    )

    type Vertex struct {
        X, Y float64
    }

    func (v *Vertex) Scale(f float64) {
        v.X = v.X * f
        v.Y = v.Y * f
    }

    func (v *Vertex) Abs() float64 {
        return math.Sqrt(v.X*v.X + v.Y*v.Y)
    }

    func main() {
        v := &Vertex{3, 4}
        fmt.Printf("Before scaling: %+v, Abs: %v\n", v, v.Abs()) // Before scaling: &{X:3 Y:4}, Abs: 5
        v.Scale(5)
        fmt.Printf("After scaling: %+v, Abs: %v\n", v, v.Abs()) // After scaling: &{X:15 Y:20}, Abs: 25
    }
```
go


#### 3.2 接口

接口类型 是由一组方法签名定义的集合。   
接口类型的值可以保存任何实现了这些方法的值。

  * interfaces.go




```go
    package main

    import (
        "fmt"
        "math"
    )

    type Abser interface {
        Abs() float64
    }

    func main() {
        var a Abser
        f := MyFloat(-math.Sqrt2)
        v := Vertex{3, 4}

        a = f  // a MyFloat 实现了 Abser
        a = &v // a *Vertex 实现了 Abser

        // 下面一行，v 是一个 Vertex（而不是 *Vertex）
        // 所以没有实现 Abser。
        //a = v

        fmt.Println(a.Abs()) // 5
    }

    type MyFloat float64

    func (f MyFloat) Abs() float64 {
        if f < 0 {
            return float64(-f)
        }
        return float64(f)
    }

    type Vertex struct {
        X, Y float64
    }

    func (v *Vertex) Abs() float64 {
        return math.Sqrt(v.X*v.X + v.Y*v.Y)
    }
```



##### 3.2.1 接口与隐式实现

类型通过实现一个接口的所有方法来实现该接口。 既然无需专门显式声明，也就没有“implements“关键字。

隐式接口从接口的实现中解耦了定义，这样接口的实现可以出现在任何包中，无需提前准备。

因此，也就无需在每一个实现上增加新的接口名称，这样同时也鼓励了明确的接口定义。

##### 3.2.2 接口值

在内部，接口值可以看做包含值和具体类型的元组：

(value, type)   
接口值保存了一个具体底层类型的具体值。

接口值调用方法时会执行其底层类型的同名方法。

  * interface-values.go




```go
    package main

    import (
        "fmt"
        "math"
    )

    type I interface {
        M()
    }

    type T struct {
        S string
    }

    func (t *T) M() {
        fmt.Println(t.S)
    }

    type F float64

    func (f F) M() {
        fmt.Println(f)
    }

    func main() {
        var i I

        i = &T{"Hello"}
        describe(i) // (&{Hello}, *main.T)
        i.M() // Hello

        i = F(math.Pi)
        describe(i) // (3.141592653589793, main.F)
        i.M() // 3.141592653589793
    }

    func describe(i I) {
        fmt.Printf("(%v, %T)\n", i, i)
    }
```
go


##### 3.2.3 底层值为 nil 的接口值

即便接口内的具体值为 nil，方法仍然会被 nil 接收者调用。   
在一些语言中，这会触发一个空指针异常，但在 Go 中通常会写一些方法来优雅地处理它（如本例中的 M 方法）。   
注意： 保存了 nil 具体值的接口其自身并不为 nil 。

  * interface-values-with-nil.go




```go
    package main

    import "fmt"

    type I interface {
        M()
    }

    type T struct {
        S string
    }

    func (t *T) M() {
        if t == nil {
            fmt.Println("<nil>")
            return
        }
        fmt.Println(t.S)
    }

    func main() {
        var i I

        var t *T
        i = t
        describe(i) // (<nil>, *main.T)
        i.M() // <nil>

        i = &T{"hello"}
        describe(i) // (&{hello}, *main.T)
        i.M() // hello
    }

    func describe(i I) {
        fmt.Printf("(%v, %T)\n", i, i)
    }
```



##### 3.2.4 nil 接口值

nil 接口值既不保存值也不保存具体类型。

为 nil 接口调用方法会产生运行时错误，因为接口的元组内并未包含能够指明该调用哪个 具体 方法的类型。

  * nil-interface-values.go




```go
    package main

    import "fmt"

    type I interface {
        M()
    }

    func main() {
        var i I
        describe(i) // (<nil>, <nil>)
        i.M() // error information
    }

    func describe(i I) {
        fmt.Printf("(%v, %T)\n", i, i)
    }
```
go


##### 3.2.5 空接口

指定了零个方法的接口值被称为 空接口：   
`interface{}`   
空接口可保存任何类型的值。 （因为每个类型都至少实现了零个方法。）   
空接口被用来处理未知类型的值。 例如，`fmt.Print` 可接受类型为 interface{} 的任意数量的参数。

  * empty-interface.go




```go
    package main

    import "fmt"

    func main() {
        var i interface{}
        describe(i) // (<nil>, <nil>)

        i = 42
        describe(i) // (42, int)

        i = "hello"
        describe(i) // (hello, string)
    }

    func describe(i interface{}) {
        fmt.Printf("(%v, %T)\n", i, i)
    }
```



##### 3.2.6 类型断言

类型断言 提供了访问接口值底层具体值的方式。   
`t := i.(T)`   
该语句断言接口值 i 保存了具体类型 T ，并将其底层类型为 T 的值赋予变量 t 。

若 i 并未保存 T 类型的值，该语句就会触发一个恐慌。

为了 判断 一个接口值是否保存了一个特定的类型， 类型断言可返回两个值：其底层值以及一个报告断言是否成功的布尔值。   
`t, ok := i.(T)`   
若 i 保存了一个 T ，那么 t 将会是其底层值，而 ok 为 true 。   
否则， ok 将为 false 而 t 将为 T 类型的零值，程序并不会产生恐慌。   
请注意这种语法和读取一个映射时的相同之处。

  * type-assertions.go




```go
    package main

    import "fmt"

    func main() {
        var i interface{} = "hello"

        s := i.(string)
        fmt.Println(s) // hello

        s, ok := i.(string)
        fmt.Println(s, ok) // hello true

        f, ok := i.(float64)
        fmt.Println(f, ok) // 0 false

        f = i.(float64) // panic
        fmt.Println(f)
    }
```
go


##### 3.2.7 类型选择

类型选择 是一种按顺序从几个类型断言中选择分支的结构。

类型选择与一般的 switch 语句相似，不过类型选择中的 case 为类型（而非值）， 它们针对给定接口值所存储的值的类型进行比较。

switch v := i.(type) {   
case T:   
// v 的类型为 T
case S:   
// v 的类型为 S
default:   
// 没有匹配，v 与 i 的类型相同
}
类型选择中的声明与类型断言 i.(T) 的语法相同，只是具体类型 T 被替换成了关键字 type 。

此选择语句判断接口值 i 保存的值类型是 T 还是 S 。 在 T 或 S 的情况下，变量 v 会分别按 T 或 S 类型保存 i 拥有的值。 在默认（即没有匹配）的情况下，变量 v 与 i 的接口类型和值相同。

  * type-switches.go




```go
    package main

    import "fmt"

    func do(i interface{}) {
        switch v := i.(type) {
        case int:
            fmt.Printf("Twice %v is %v\n", v, v*2)
        case string:
            fmt.Printf("%q is %v bytes long\n", v, len(v))
        default:
            fmt.Printf("I don't know about type %T!\n", v)
        }
    }

    func main() {
        do(21)       // Twice 21 is 42
        do("hello")  // "hello" is 5 bytes long
        do(true)     // I don't know about type bool!
    }
```



##### 3.2.8 Stringer

fmt 包中定义的 Stringer 是最普遍的接口之一。


```
    type Stringer interface {
        String() string
    }
```



Stringer 是一个可以用字符串描述自己的类型。`fmt` 包（还有很多包）都通过此接口来打印值。

  * stringer.go




```go
    package main

    import "fmt"

    type Person struct {
        Name string
        Age  int
    }

    func (p Person) String() string {
        return fmt.Sprintf("%v (%v years)", p.Name, p.Age)
    }

    func main() {
        a := Person{"Arthur Dent", 42}
        z := Person{"Zaphod Beeblebrox", 9001}
        fmt.Println(a, z) // Arthur Dent (42 years) Zaphod Beeblebrox (9001 years)
    }
```
go


练习：Stringer   
通过让 IPAddr 类型实现 fmt.Stringer 来打印点号分隔的地址。

例如，`IPAddr{1,`2,`3,`4}` 应当打印为 “1.2.3.4” 。

  * exercise-stringer.go




```go
    package main

    import "fmt"

    type IPAddr [4]byte

    // TODO: Add a "String() string" method to IPAddr.
    func (p IPAddr) String() string {
        return fmt.Sprintf("%v.%v.%v.%v", p[0], p[1], p[2], p[3]);
    }

    func main() {
        hosts := map[string]IPAddr{
            "loopback":  {127, 0, 0, 1},
            "googleDNS": {8, 8, 8, 8},
        }
        for name, ip := range hosts {
            fmt.Printf("%v: %v\n", name, ip)
        }
    }
```



  * result




```
    loopback: 127.0.0.1
    googleDNS: 8.8.8.8
```



##### 3.2.9 错误

Go 程序使用 error 值来表示错误状态。

与 fmt.Stringer 类似， error 类型是一个内建接口：


```
    type error interface {
        Error() string
    }
```



（与 fmt.Stringer 类似， fmt 包在打印值时也会满足 error 。）

通常函数会返回一个 error 值，调用的它的代码应当判断这个错误是否等于 nil 来进行错误处理。


```
    i, err := strconv.Atoi("42")
    if err != nil {
        fmt.Printf("couldn't convert number: %v\n", err)
        return
    }
    fmt.Println("Converted integer:", i)
```



error 为 nil 时表示成功；非 nil 的 error 表示失败。

  * errors.go




```go
    package main

    import (
        "fmt"
        "time"
    )

    type MyError struct {
        When time.Time
        What string
    }

    func (e *MyError) Error() string {
        return fmt.Sprintf("at %v, %s",
            e.When, e.What)
    }

    func run() error {
        return &MyError{
            time.Now(),
            "it didn't work",
        }
    }

    func main() {
        if err := run(); err != nil {
            fmt.Println(err)
        }
    }
```
go


练习：错误   
从之前的练习中复制 Sqrt 函数，修改它使其返回 error 值。

Sqrt 接受到一个负数时，应当返回一个非 nil 的错误值。复数同样也不被支持。

创建一个新的类型

type ErrNegativeSqrt float64   
并为其实现

func (e ErrNegativeSqrt) Error() string   
方法使其拥有 error 值，通过 ErrNegativeSqrt(-2).Error() 调用该方法应返回 “cannot Sqrt negative number: -2” 。

注意： 在 Error 方法内调用 fmt.Sprint(e) 会让程序陷入死循环。可以通过先转换 e 来避免这个问题：`fmt.Sprint(float64(e))` 。这是为什么呢？

修改 Sqrt 函数，使其接受一个负数时，返回 ErrNegativeSqrt 值。

  * exercise-errors.go




```go
    package main

    import (
        "fmt"
        "math"
    )

    func Sqrt(x float64) (float64, error) {
        if x < 0 {
            return 0, ErrNegativeSqrt(x)
        }

         z := float64(1)
         for {
              y := z - (z*z-x)/(2*z)
              if math.Abs(y-z) < 1e-10 {
                   return y, nil
              }
              z = y
         }
         return z, nil
    }


    type ErrNegativeSqrt float64
    func (e ErrNegativeSqrt) Error() string {
        return fmt.Sprintf("cannot Sqrt negative number: %v", float64(e))
    }


    func main() {
        fmt.Println(Sqrt(2)) // 1.4142135623730951 <nil>
        fmt.Println(Sqrt(-2)) // 0 cannot Sqrt negative number: -2
    }
```



##### 3.2.10 Reader

io 包指定了 io.Reader 接口， 它表示从数据流的末尾进行读取。

Go 标准库包含了该接口的许多实现， 包括文件、网络连接、压缩和加密等等。   
io.Reader 接口有一个 Read 方法：   
`func (T) Read(b []byte) (n int, err error)`   
Read 用数据填充给定的字节切片并返回填充的字节数和错误值。 在遇到数据流的结尾时，它会返回一个 io.EOF 错误。

示例代码创建了一个 strings.Reader 并以每次 8 字节的速度读取它的输出。

  * reader.go




```go
    package main

    import (
        "fmt"
        "io"
        "strings"
    )

    func main() {
        r := strings.NewReader("Hello, Reader!")

        b := make([]byte, 8)
        for {
            n, err := r.Read(b)
            fmt.Printf("n = %v err = %v b = %v\n", n, err, b)
            fmt.Printf("b[:n] = %q\n", b[:n])
            if err == io.EOF {
                break
            }
        }
    }
```



  * 输出




```
    b[:n] = "Hello, R"
    n = 6 err = <nil> b = [101 97 100 101 114 33 32 82]
    b[:n] = "eader!"
    n = 0 err = EOF b = [101 97 100 101 114 33 32 82]
    b[:n] = ""
```
go


练习：Reader   
实现一个 Reader 类型，它产生一个 ASCII 字符 ‘A’ 的无限流。

  * exercise-reader.go




```go
    package main

    import "github.com/Go-zh/tour/reader"

    type MyReader struct{}

    // TODO: Add a Read([]byte) (int, error) method to MyReader.
    func (mr MyReader) Read(b []byte) (int, error){
        b[0] = 'A'
        return 1, nil
    }

    func main() {
        reader.Validate(MyReader{})
    }
```



练习：rot13Reader   
有种常见的模式是一个 io.Reader 包装另一个 io.Reader ，然后通过某种方式修改其数据流。

例如，gzip.NewReader 函数接受一个 io.Reader （已压缩的数据流）并返回一个同样实现了 io.Reader 的 *gzip.Reader （解压后的数据流）。

编写一个实现了 io.Reader 并从另一个 io.Reader 中读取数据的 rot13Reader ， 通过应用 rot13 代换密码对数据流进行修改。

rot13Reader 类型已经提供。实现 Read 方法以满足 io.Reader 。

  * exercise-rot-reader.go




```go
    package main

    import (
        "io"
        "os"
        "strings"
    )

    type rot13Reader struct {
        r io.Reader
    }

    func(self rot13Reader)Read(p []byte) (n int, err error){
         self.r.Read(p)
         leng := len(p)
         for i := 0; i < leng; i++ {
              switch{
              case p[i] >= 'a' && p[i] < 'n':
                   fallthrough
              case p[i] >= 'A' && p[i] < 'N':
                   p[i] = p[i] + 13
              case p[i] >= 'n' && p[i] <= 'z':
                   fallthrough
              case p[i] >= 'N' && p[i] <= 'Z':
                   p[i] = p[i] - 13
              }
         }
         return leng, nil
    }

    func main() {
        s := strings.NewReader("Lbh penpxrq gur pbqr!")
        r := rot13Reader{s}
        io.Copy(os.Stdout, &r)
    }
```



##### 3.2.11 图像

image 包定义了 Image 接口：


```
    package image

    type Image interface {
        ColorModel() color.Model
        Bounds() Rectangle
        At(x, y int) color.Color
    }
```
go


注意： Bounds 方法的返回值 Rectangle 实际上是一个 image.Rectangle，它在 image 包中声明。   
（请参阅**文档** 了解全部信息。）   
`color.Color` 和 `color.Model`类型也是接口，但是通常因为直接使用预定义的实现 `image.RGBA` 和 `image.RGBAModel` 而被忽视了。这些接口和类型由`image/color`包定义。

  * images.go




```go
    package main

    import (
        "fmt"
        "image"
    )

    func main() {
        m := image.NewRGBA(image.Rect(0, 0, 100, 100))
        fmt.Println(m.Bounds()) // (0,0)-(100,100)
        fmt.Println(m.At(0, 0).RGBA()) // 0 0 0 0
    }
```



练习：图片   
还记得之前编写的图片生成器吗？现在来另外编写一个，不过这次将会返回 **image.Image** 来代替 **slice** 的数据。

自定义的 **Image** 类型，要实现必要的方法，并且调用 **pic.ShowImage** 。

Bounds 应当返回一个 **image.Rectangle** ，例如 `image.Rect(0, 0, w, h)`。

ColorModel 应当返回 **color.RGBAModel** 。

At 应当返回一个颜色；在这个例子里，在最后一个图片生成器的值 v 匹配 `color.RGBA{v, v, 255, 255}`。

  * exercise-images.go




```go
    package main

    import (
         "image"
         "golang.org/x/tour/pic"
         "image/color"
    )

    type Image struct{
         W int
         H int
    }

    func(self Image) Bounds() image.Rectangle {
         return image.Rect(0, 0, self.W, self.H)
    }

    func(self Image) ColorModel() color.Model {
         return color.RGBAModel
    }

    func(self Image) At(x,y int) color.Color {
         return color.RGBA{uint8(x), uint8(y), 255, 255}
    }

    func main() {
         m := Image{W:100, H:100}
         pic.ShowImage(m)
    }
```
go


* * *

### 4 并发

#### 4.1 Go 程

`_Go 程_（goroutine）_`是由 Go 运行时管理的轻量级线程。   
`go f(x, y, z)`   
会启动一个新的 Go 程并执行`f(x, y, z)`。   
f 、 x 、 y 和 z 的求值发生在当前的 Go 程中，而 f 的执行发生在新的 Go 程中。

Go 程在相同的地址空间中运行，因此在访问共享的内存时必须进行同步。sync 包提供了这种能力，不过在 Go 中并不经常用到，因为还有其它的办法。

  * gorountines.go




```go
    package main

    import (
        "fmt"
        "time"
    )

    func say(s string) {
        for i := 0; i < 5; i++ {
            time.Sleep(100 * time.Millisecond)
            fmt.Println(s)
        }
    }

    func main() {
        go say("world")
        say("hello")
    }
```



#### 4.2 信道

信道是带有类型的管道，你可以通过它用信道操作符 <\- 来发送或者接收值。


```
    ch <- v    // 将 v 发送至信道 ch。
    v := <-ch  // 从 ch 接收值并赋予 v。
```



（“箭头”就是数据流的方向。）

和映射与切片一样，信道在使用前必须创建：

`ch := make(chan int)`   
默认情况下，发送和接收操作在另一端准备好之前都会阻塞。这使得 Go 程可以在没有显式的锁或竞态变量的情况下进行同步。

以下示例对切片中的数进行求和，将任务分配给两个 Go 程。 一旦两个 Go 程完成了它们的计算，它就能算出最终的结果。

  * channels.go




```go
    package main

    import "fmt"

    func sum(s []int, c chan int) {
        sum := 0
        for _, v := range s {
            sum += v
        }
        c <- sum // 将和送入 c
    }

    func main() {
        s := []int{7, 2, 8, -9, 4, 0}

        c := make(chan int)
        go sum(s[:len(s)/2], c)
        go sum(s[len(s)/2:], c)
        x, y := <-c, <-c // 从 c 中接收

        fmt.Println(x, y, x+y) // -5 17 12
    }
```
go


##### 4.2.1 带缓冲的信道

信道可以是 带缓冲的 。将缓冲长度作为第二个参数提供给 make 来初始化一个带缓冲的信道：   
`ch := make(chan int, 100)`   
仅当信道的缓冲区填满后，向其发送数据时才会阻塞。当缓冲区为空时，接受方会阻塞。

  * buffered-channels.go




```go
    package main

    import "fmt"

    func main() {
        ch := make(chan int, 2)
        ch <- 1
        ch <- 2
        fmt.Println(<-ch) // 1
        fmt.Println(<-ch) // 2
    }
```



#### 4.3 range 和 close

发送者可通过 `close` 关闭一个信道来表示没有需要发送的值了。接收者可以通过为接收表达式分配第二个参数来测试信道是否被关闭：若没有值可以接收且信道已被关闭，那么在执行完   
`v, ok := <-ch`   
之后 ok 会被设置为 false 。   
循环 `for i := range c` 会不断从信道接收值，直到它被关闭。

**注意：** 只有发送者才能关闭信道，而接收者不能。向一个已经关闭的信道发送数据会引发程序恐慌（panic）。

**还要注意：** 信道与文件不同，通常情况下无需关闭它们。只有在必须告诉接收者不再有值需要发送的时候才有必要关闭，例如终止一个 range 循环。

  * range-and-close.go




```go
    package main

    import (
        "fmt"
    )

    func fibonacci(n int, c chan int) {
        x, y := 0, 1
        for i := 0; i < n; i++ {
            c <- x
            x, y = y, x+y
        }
        close(c)
    }

    func main() {
        c := make(chan int, 10)
        go fibonacci(cap(c), c)
        for i := range c {
            fmt.Println(i)
        }
    }
```
go


#### 4.4 select 语句

select 语句使一个 Go 程可以等待多个通信操作。

select 会阻塞到某个分支可以继续执行为止，这时就会执行该分支。当多个分支都准备好时会随机选择一个执行。

  * select.go




```go
    package main

    import "fmt"

    func fibonacci(c, quit chan int) {
        x, y := 0, 1
        for {
            select {
            case c <- x:
                x, y = y, x+y
            case <-quit:
                fmt.Println("quit")
                return
            }
        }
    }

    func main() {
        c := make(chan int)
        quit := make(chan int)
        go func() {
            for i := 0; i < 10; i++ {
                fmt.Println(<-c)
            }
            quit <- 0
        }()
        fibonacci(c, quit)
    }
```



##### 4.4.1 默认选择

当 select 中的其它分支都没有准备好时，`default` 分支就会执行。

为了在尝试发送或者接收时不发生阻塞，可使用 default 分支：


```
    select {
    case i := <-c:
        // 使用 i
    default:
        // 从 c 中接收会阻塞时执行
    }
```



  * default-selection.go




```go
    package main

    import (
        "fmt"
        "time"
    )

    func main() {
        tick := time.Tick(100 * time.Millisecond)
        boom := time.After(500 * time.Millisecond)
        for {
            select {
            case <-tick:
                fmt.Println("tick.")
            case <-boom:
                fmt.Println("BOOM!")
                return
            default:
                fmt.Println("    .")
                time.Sleep(50 * time.Millisecond)
            }
        }
    }
```



  * 执行输出




```
        .
        .
    tick.
        .
        .
    tick.
        .
        .
    tick.
        .
        .
    tick.
        .
        .
    BOOM!
```
go


#### 4.5 练习：等价二叉树1

  1. 实现 Walk 函数。
  2. 测试 Walk 函数。   
函数 `tree.New(k)` 用于构造一个随机结构的二叉树，它保存了值 k 、 2k 、 3k … 10k 。



创建一个新的信道 ch 并且对其进行步进：   
`go Walk(tree.New(1), ch)`   
然后从信道中读取并打印 10 个值。应当是数字 `1, 2, 3, ..., 10` 。

  1. 用 Walk 实现 Same 函数来检测 t1 和 t2 是否存储了相同的值。

  2. 测试 Same 函数。




`Same(tree.New(1), tree.New(1))` 应当返回 true ，而 `Same(tree.New(1), tree.New(2))` 应当返回 false 。

  * exercise-equivalent-binary-trees.go




```go
    package main

    import "golang.org/x/tour/tree"

    // Walk 步进 tree t 将所有的值从 tree 发送到 channel ch。
    func Walk(t *tree.Tree, ch chan int){
         if t == nil {
              return
         }

         Walk(t.Left, ch)
         ch <- t.Value
         Walk(t.Right, ch)
    }

    // Same 检测树 t1 和 t2 是否含有相同的值。
    func Same(t1, t2 *tree.Tree) bool {
         ch1 := make(chan int)
         ch2 := make(chan int)
         go func() {
              Walk(t1, ch1)
              ch1 <- 0
         }()

         go func() {
              Walk(t2, ch2)
              ch2 <- 0
         }()

         for {
              t1 := <-ch1
              t2 := <-ch2
              if t1 == 0 && t2 == 0 {
                   return true;
              }

              if t1 == t2 {
                   continue;
              } else {
                   return false;
              }
         }
         return true
    }

    func main() {
             ch := make(chan int)
         go func() {
              Walk(tree.New(1), ch)
              ch <- 0
         }()

         for {
              t := <-ch
              if t == 0 {
                   break;
              }
              println(t)
         }

         println(Same(tree.New(1), tree.New(2)))
    }
```



  * 执行输出




```
    1
    2
    3
    4
    5
    6
    7
    8
    9
    10
    false
```



#### 4.6 sync.Mutex

我们已经看到 channel 用来在各个 goroutine 间进行通信是非常合适的了。

但是如果我们并不需要通信呢？比如说，如果我们只是想保证在每个时刻，只有一个 goroutine 能访问一个共享的变量从而避免冲突？

这里涉及的概念叫做 **互斥** ，通常使用 **_互斥锁_(mutex)_**来提供这个限制。

Go 标准库中提供了 `sync.Mutex` 类型及其两个方法：


```
    Lock
    Unlock
```



我们可以通过在代码前调用 Lock 方法，在代码后调用 Unlock 方法来保证一段代码的互斥执行。 参见 Inc 方法。

我们也可以用 defer 语句来保证互斥锁一定会被解锁。参见 Value 方法。

  * mutex-counter.go




```go
    package main

    import (
        "fmt"
        "sync"
        "time"
    )

    // SafeCounter 的并发使用是安全的。
    type SafeCounter struct {
        v   map[string]int
        mux sync.Mutex
    }

    // Inc 增加给定 key 的计数器的值。
    func (c *SafeCounter) Inc(key string) {
        c.mux.Lock()
        // Lock 之后同一时刻只有一个 goroutine 能访问 c.v
        c.v[key]++
        c.mux.Unlock()
    }

    // Value 返回给定 key 的计数器的当前值。
    func (c *SafeCounter) Value(key string) int {
        c.mux.Lock()
        // Lock 之后同一时刻只有一个 goroutine 能访问 c.v
        defer c.mux.Unlock()
        return c.v[key]
    }

    func main() {
        c := SafeCounter{v: make(map[string]int)}
        for i := 0; i < 1000; i++ {
            go c.Inc("somekey")
        }

        time.Sleep(time.Second)
        fmt.Println(c.Value("somekey")) // 1000
    }
```
go


#### 4.7 练习：Web 爬虫

在这个练习中，我们将会使用 Go 的并发特性来并行化一个 Web 爬虫。

修改 Crawl 函数来并行地抓取 URL，并且保证不重复。

提示： 你可以用一个 map 来缓存已经获取的 URL，但是要注意 map 本身并不是并发安全的！

  * exercise-web-crawler.go




```go
    package main

    import (
         "fmt"
         "sync"
    )

    type Fetcher interface {
         // Fetch returns the body of URL and
         // a slice of URLs found on that page.
         Fetch(url string) (body string, urls []string, err error)
    }

    // Crawl uses fetcher to recursively crawl
    // pages starting with url, to a maximum of depth.
    func Crawl(url string, depth int, fetcher Fetcher, out chan string, end chan bool) {
         if depth <= 0 {
              end <- true
              return
         }

         if _, ok := crawled[url]; ok {
              end <- true
              return
         }
         crawledMutex.Lock()
         crawled[url] = true
         crawledMutex.Unlock()

         body, urls, err := fetcher.Fetch(url)
         if err != nil {
              out <- fmt.Sprintln(err)
              end <- true
              return
         }

         out <- fmt.Sprintf("found: %s %q\n", url, body)
         subEnd := make(chan bool)
         for _, u := range urls {
              go Crawl(u, depth-1, fetcher, out, subEnd)
         }

         for i := 0; i < len(urls); i++ {
              <- subEnd
         }

         end <- true
    }

    var crawled = make(map[string]bool)
    var crawledMutex sync.Mutex

    func main() {
         out := make(chan string)
         end := make(chan bool)

         go Crawl("http://golang.org/", 4, fetcher, out, end)
         for {
              select {
              case t := <- out:
                   fmt.Print(t)
              case <- end:
                   return
              }
         }
    }


    // fakeFetcher is Fetcher that returns canned results.
    type fakeFetcher map[string]*fakeResult

    type fakeResult struct {
         body string
         urls     []string
    }

    func (f *fakeFetcher) Fetch(url string) (string, []string, error) {
         if res, ok := (*f)[url]; ok {
              return res.body, res.urls, nil
         }
         return "", nil, fmt.Errorf("not found: %s", url)
    }

    // fetcher is a populated fakeFetcher.
    var fetcher = &fakeFetcher{
         "http://golang.org/": &fakeResult{
              "The Go Programming Language",
              []string{
                   "http://golang.org/pkg/",
                   "http://golang.org/cmd/",
              },
         },
         "http://golang.org/pkg/": &fakeResult{
              "Packages",
              []string{
                   "http://golang.org/",
                   "http://golang.org/cmd/",
                   "http://golang.org/pkg/fmt/",
                   "http://golang.org/pkg/os/",
              },
         },
         "http://golang.org/pkg/fmt/": &fakeResult{
              "Package fmt",
              []string{
                   "http://golang.org/",
                   "http://golang.org/pkg/",
              },
         },
         "http://golang.org/pkg/os/": &fakeResult{
              "Package os",
              []string{
                   "http://golang.org/",
                   "http://golang.org/pkg/",
              },
         },
    }
```



### 5 Where to Go from here…

[Where to Go](https://tour.go-zh.org/concurrency/11)

### 6 参考

  * [Go 指南](https://tour.go-zh.org/list)

  * [go-tour 练习解答](http://www.cnblogs.com/yjf512/archive/2012/12/09/2810302.html)




* * *

  1. [Tree](https://godoc.org/golang.org/x/tour/tree#Tree) ↩
