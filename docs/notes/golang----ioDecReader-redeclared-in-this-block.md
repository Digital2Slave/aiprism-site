# golang -- ioDecReader redeclared in this block

### 1 问题

利用 **govendor** 来管理基于 **gin** 的golang web项目，我在用`govendor remove`移除不必要golang第三方库后，在项目根目录下运行`go run main.go`出现类似以下错误：


```
    ioDecReader redeclared in this block
```



### 2 解决方法

在项目根目录内运行以下命令修复：


```
    govendor sync
```



### 3 参考

[govendor](https://github.com/kardianos/govendor)