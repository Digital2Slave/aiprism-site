# 深入浅出Nodejs

### 命令行

  1. node –trace_gc // 查看垃圾回收日志
  2. node –prof // 查看V8执行时的性能分析
  3. linux-tick-processor v8.log 

> node源码/deps/v8/tools/linux-tick-processor   
>  统计日志信息 

  4. node & process.memoryUsage() // 查看内存使用情况 rss: 进程的常驻内存大小

  5. totalmem() freemem() // os模块也可以查看内存使用情况



### 常用模块/类库

  1. underscore // 著名的类库
  2. event
  3. Q // Promise/Deferred模式
  4. when // Promise/Deferred模式
  5. async // 流程控制模块
  6. node-heapdump // 内存泄露排查
  7. node-memwatch // 内存泄露排查
  8. net // TCP
  9. dgram // UDP
  10. http // HTTP
  11. https // HTTPS



### 缓存方法

  1. Redis
  2. Memcached



### 函数

  1. setImmediate()
  2. setTimeout() // 阻塞代码
  3. setInterval()



### 高阶函数

> 可以把函数作为参数，或者返回值的函数。

  1. forEach()
  2. map()
  3. reduce()
  4. reduceRight()
  5. filter()
  6. every()
  7. some()



### 单元测试工具

  1. [mocha](https://mochajs.org/)
  2. should // BDD
