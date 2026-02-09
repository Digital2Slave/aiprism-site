# Elasticsearch 中文搜索搭建

Elasticsearch 简称es，本文以**elasticsearch2.3.1** 为例进行安装。   
根据自己的需求，替换 **username** 和 **serverhost** 的值。

### 预备阶段

**本地电脑终端** 登录服务器并切换至用户目录下:

`$ ssh -o ServerAliveInterval=60 username@serverhost`

> 记得输入username对应的password

`$ cd ~`

#### 创建目录:


```
    $ mkdir ~/app               # es相关的bin目录
    $ mkdir ~/data/es/logs/ -p  # es的log目录
    $ mkdir ~/data/es/data/ -p  # es的data目录
    $ mkdir ~/local             # es相关java安装目录
    $ mkdir ~/pkgs              # es相关安装源文件
    $ mkdir ~/workspace         # es相关用户工作空间
```



#### 安装最新版的java

[java](http://www.oracle.com/technetwork/cn/java/javase/downloads/jdk8-downloads-2133151-zhs.html)   
本文以 Linux x64 172.91 MB [jdk-8u73-linux-x64.tar.gz](http://download.oracle.com/otn-pub/java/jdk/8u73-b02/jdk-8u73-linux-x64.tar.gz)


```
    $ cd ~/pkgs
    $ wget http://download.oracle.com/otn-pub/java/jdk/8u73-b02/jdk-8u73-linux-x64.tar.gz
    $ cp jdk-8u73-linux-x64.tar.gz ~/local
    $ cd ~/local
    $ tar -zxvf jdk-8u73-linux-x64.tar.gz
    $ rm jdk-8u73-linux-x64.tar.gz
```



* * *

如果你在服务器上面无法下载，可以在 **本地电脑终端** 上面下载后，再通过`scp`命令复制到服务器上面的`~/pkgs`目录下面。假设当前路径包含已下载 **jdk-8u73-linux-x64.tar.gz** ，执行以下命令:

`$ scp jdk-8u73-linux-x64.tar.gz username@serverhost:~/pkgs`

> 执行**scp** 命令后，记得username对应输入password！

* * *

紧接着，在服务器上面配置java的环境变量。


```
    $ cd ~/local
    $ cd jdk1.8.0_77
    $ pwd
    /home/elasticsearch/local/jdk1.8.0_77
    $ vim ~/.bash_profile
```



在 **.bash_profile** 中添加：


```
    JAVA_HOME=$HOME/local/jdk1.8.0_77
    export JAVA_HOME
    CLASSPATH=.:$JAVA_HOME/lib
    export CLASSPATH
```



退出并保持修改，使修改立即生效。


```
    $ source ~/.bash_profile
    $ java -version
    java version "1.8.0_77"
    Java(TM) SE Runtime Environment (build 1.8.0_77-b03)
    Java HotSpot(TM) 64-Bit Server VM (build 25.77-b03, mixed mode)
```



### 安装Elasticsearch最新版

elasticsearch[下载](https://download.elastic.co/elasticsearch/release/org/elasticsearch/distribution/tar/elasticsearch/2.3.1/elasticsearch-2.3.1.tar.gz)

下载最新包并解压到`~/app`

修改elasticsearch配置


```
    $ cd ~/app/elasticsearch-2.3.1/config
    $ vim elasticsearch.yml
```



在elasticsearch.yml中修改:


```
    path.data: /home/elasticsearch/data/es/data
    path.logs: /home/elasticsearch/data/es/logs
    cluster.name: yourawesomename
    bootstrap.mlockall: true
    discovery.zen.minimum_master_nodes: 1
    http.port: 9200
    network.host: 0.0.0.0
    discovery.zen.ping.unicast.hosts: ["yourserverhost"]
```



根据自己的需求，替换 **cluster.name** 和 **discovery.zen.ping.unicast.hosts** 值，保存并退出。

### 安装插件

#### 安装中文分词插件

[官网](https://github.com/medcl/elasticsearch-analysis-ik)

a. [下载](https://github.com/medcl/elasticsearch-analysis-ik/archive/v1.9.1.tar.gz)

b. **本地** 解压并打包


```
    $ tar -zxvf elasticsearch-analysis-ik-1.9.1.tar.gz
    $ cd elasticsearch-analysis-ik-1.9.1
    $ mvn package
```



c. 服务器上创建 **ik** 文件夹


```
    $ mkdir ~/app/elasticsearch-2.3.1/plugins/ik -p
```



d. 上传 **本地** 打包文件到服务器 **ik** 文件夹并解压


```
    $ scp target/releases/elasticsearch-analysis-ik-1.9.1.zip username@serverhost:~/app/elasticsearch-2.3.1/plugins/ik
```



> 记得输入username对应的password


```
    $ unzip elasticsearch-analysis-ik-1.9.0.zip
    $ rm elasticsearch-analysis-ik-1.9.0.zip
```



#### 服务器上安装数据库importer


```
    $ cd ~/app/
    $ wget http://xbib.org/repository/org/xbib/elasticsearch/importer/elasticsearch-jdbc/2.3.1.0/elasticsearch-jdbc-2.3.1.0-dist.zip
    $ unzip elasticsearch-jdbc-2.3.1.0-dist.zip
    $ rm  elasticsearch-jdbc-2.3.1.0-dist.zip
```



#### 服务器上安装数据库head

[官网](https://github.com/mobz/elasticsearch-head)


```
    $ cd ~/app
    $ elasticsearch-2.3.1/bin/plugin install mobz/elasticsearch-head
```



### 启动es


```
    $ cd ~/app/elasticsearch-2.3.1
    $ ./bin/elasticsearch -d
```



* * *

### **Reindexing your data with zero downtime**

> 根据自己的需求，替换index_v1, solution.

创建索引   
`curl -XPUT localhost:9200/index_v1?pretty -d @index_v1.json`

index_v1.json中的内容如下所示:


```json
    {
    "mappings":
        {
        "solution": {
                "_all": {
                    "analyzer": "ik_smart",
                    "search_analyzer": "ik_smart",
                    "term_vector": "no",
                    "store": "false"
                },
                "properties": {
                    "btype": {
                         "type": "string",
                         "index": "not_analyzed"
                    },
                    "title": {
                        "type": "string",
                        "store": "yes",
                        "term_vector": "with_positions_offsets",
                        "analyzer": "ik_smart",
                        "search_analyzer": "ik_smart",
                        "include_in_all": "true",
                        "boost": 8
                    },
                    "update_time": {
                        "type": "date",
                        "store": "yes",
                        "format": "dateOptionalTime"
                     }
                }
            }
        }
    }
```


> 定义索引别名 


```json
    curl -XPOST localhost:9200/_aliases -d '
    {
        "actions": [
            { "add": {
                "alias": "myindex",
                "index": "index_v1"
            }}
        ]
    }'
```



> 服务器上导入数据库数据


```
    $ cd ~/app/elasticsearch-jdbc-2.3.1.0/bin
    $ touch index_v1.sh
    $ vim index_v1.sh
```



> 根据实际情况修改mysql的host:port/database, user, password, sql.


```json
        #!/bin/sh
        DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
        bin=${DIR}/../bin
        lib=${DIR}/../lib
        echo '
        {
            "type" : "jdbc",
            "jdbc" : {
                "elasticsearch" : {
                     "cluster" : "yourawesomename",
                     "host" : "localhost",
                     "port" : 9300
                },
                "url" : "jdbc:mysql://host:port/database",
                "user" : "tester",
                "password" : "12345678",
                "sql" : "select id as _id,type as btype,title,update_time from dbtable",
                "index" : "index_v1",
                "type" : "solution",
                "index_settings" : {
                    "index" : {
                        "number_of_shards" : 1
                    }
                }
            }
        }
        ' | java \
            -cp "${lib}/*" \
            -Dlog4j.configurationFile=${bin}/log4j2.xml \
            org.xbib.tools.Runner \
            org.xbib.tools.JDBCImporter
```


保存并退出, index_v1.sh; 执行导入数据库脚本index_v1.sh   
`$ sh index_v1.sh`

> 数据导入耗时依据导入的数据量，导入完成后不会输入任何信息。

需求更改 

`curl -XPUT localhost:9200/index_v2 -d @index_v2.json`

移除index_v1 


```json
    curl -XPOST localhost:9200/_aliases -d '
    {
        "actions": [
            { "remove": {
                "alias": "myindex",
                "index": "index_v1"
            }},
            { "add": {
                "alias": "myindex",
                "index": "index_v2"
            }}
        ]
    }'
```

删除 index_v1 

`curl -XDELETE localhost:9200/index_v1`

* * *

### 踩坑小分队

  * 批量更新『打开文件过多』

> 管理员权限，更改open files 为65536。


```
    $ ulimit -a
    core file size          (blocks, -c) 0
    data seg size           (kbytes, -d) unlimited
    scheduling priority             (-e) 0
    file size               (blocks, -f) unlimited
    pending signals                 (-i) 127455
    max locked memory       (kbytes, -l) unlimited
    max memory size         (kbytes, -m) unlimited
    open files                      (-n) 65536
    pipe size            (512 bytes, -p) 8
    POSIX message queues     (bytes, -q) 819200
    real-time priority              (-r) 0
    stack size              (kbytes, -s) 10240
    cpu time               (seconds, -t) unlimited
    max user processes              (-u) 1024
    virtual memory          (kbytes, -v) unlimited
    file locks                      (-x) unlimited
```

  * 批量更新 『无法分配内存』



```
**管理员权限** ，更改`/etc/security/limits.conf`, for example:


    # allow user 'elasticsearch' mlockall
    elasticsearch soft memlock unlimited
    elasticsearch hard memlock unlimited
```



  * 批量更新 『JVM out of memory』



在`.bash_profile`添加


```
    export ES_HEAP_SIZE=1g  # 更具实际情况设置 free -m查看使用情况
    source .bash_profile    # 立即生效。
```



  * 批量更新 『 Error: Request error, retrying 』



设置请求批量请求的 [文档大小](   
<https://www.elastic.co/guide/en/elasticsearch/guide/master/indexing-performance.html#_using_and_sizing_bulk_requests>)

* * *