# Linux 系统中，查看指定文件夹内各个子文件夹内的文件数量

### count脚本


```
    #!/bin/sh

    numOfArgs=$#
    if [ $numOfArgs -ne 1 ]; then
        echo -e "Usage: \nbash $0 dirForCount"
        exit -1
    fi

    # args
    ROOTDIR=$1

    # core part
    find $ROOTDIR -maxdepth 1 -type d | sort | while read dir; do
    count=$(find "$dir" -type f | wc -l)
    echo "$dir: $count"
    done
```



### 执行


```
    $ bash count.sh benchmark
    benchmark: 2317
    benchmark/0: 20
    benchmark/1: 891
    benchmark/2: 65
    benchmark/3: 13
    benchmark/4: 1328
```



### 参考

[linux如何显示一个目录下各子目录的文件个数](https://zhidao.baidu.com/question/1958122238756178100.html)