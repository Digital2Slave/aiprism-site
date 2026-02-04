# Pipe

### choose command

  1. **cut**

cut 主要用于将同一行里面的数据进行分解。

     * cut -d ‘分隔符’ -f fields

`$ echo $PATH | cut -d ':' -f 5`

`$ echo $PATH | cut -d ':' -f 3,5`

     * cut -c 字符范围

`$ export | head -n 5`

       * declare -x CLICOLOR=”1”

`$ export | head -n 5 | cut -c 12-`

       * CLICOLOR=”1”
  2. **grep**

grep 分析一行信息，若一行当中有我们需要的信息，则把该行打印出来。

grep [-acinv] [–color=auto] ‘查找字符串’ filename



```
     * -a 将binary 文件以text文件的方式查找数据；
     * -c 计算’查找字符串’的次数；
     * -i 忽略大小写的不同；
     * -n 顺便输出行号；
     * -v 显示出没有’查找字符串’的那一行信息；
     * –color=auto 将找到的’查找字符串’部分加上颜色显示；
```





### Sort command

  1. **sort**

sort [-fbMnrtuk] [file or stdin]



```
     * -f: 忽略大小写
     * -b: 忽略最前面的空格
     * -M: 以月份的名字排序
     * -n: 以“纯数字”排序
     * -r: 反向排序
     * -t: 分隔符，默认是［table］来分隔
     * -u: uniq，相同数据中仅出现一行
     * -k: 以那个区间来进行排序
```


  2. **wc**

wc [lwm]



```
     * -l: 行数
     * -w: 英文单词数
     * -m: 字符数 （Mac unix ‘-c’）
```


  3. **uniq**

uniq [-ic]

     * -i: 忽略大小写
     * -c: 进行行计数
