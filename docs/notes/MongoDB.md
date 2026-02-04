# MongoDB

### PyMongo

<https://docs.mongodb.org/getting-started/python/>


```json
    db.user.find({
                 $and:
                      [
                        {"user_id": {$exists: true}},
                        {"createtime":
                          {$gte: "1442289375298", $lte: "1442544392813"}}

                      ]

                })


    tianzhaixing@c-mini:~$ mongo
    > use douban
    > db.Culture.find({"bookinfo.ISBN":"9787100017664"})
    { "_id" : ObjectId("56089dee145da4e928192eb5"), "bookinfo" : { "平均评分" : "9.3", "书名" : "國史大綱（上下）", "出版社" : "商務印書館", "出版年" : "2013-8", "页数" : "914", "定价" : "76.00元", "装帧" : "平装", "丛书" : "", "ISBN" : "9787100017664", "coverurl" : "http://img6.douban.com/lpic/s1034305.jpg" } }
    > new Date('2015-07-01').valueOf()
    1435708800000
    >new Date('2015-10-16').valueOf()
    1444953600000


    foba:PRIMARY> db.scanbehavior.find({"type": "byBarcode"}, {'bid':{"$exists":true}}, {'createtime': {"$gt":'1445702400000', "lte": '1446307200000'} }).count()
    12331
    foba:PRIMARY> db.scanbehavior.find({"type": {"$ne":"byBarcode"}}, {'bid':{"$exists":true}}, {'createtime': {"$gt":'1445702400000', "lte": '1446307200000'} }).count()
    20407
```



#### Pymongo Operator


```
    >>> UserIdsAgents = logs.find({"$and":[{"body.user_id":{"$exists":"True"}}, {"headers.user-agent":{"$exists":"True"}}]})
    >>> UserIdsAgents.count()
    16934
    >>> userAgentTypes = set()
    >>> for cur in UserIdsAgents:
    ...    userAgentTypes.add(cur['headers']['user-agent'])
    ...
    >>> len(userAgentTypes)
    14
    >>> for s in userAgentTypes:
    ...     print s
    ...
    bookshelf/0.8.0 (iPhone; iOS 8.4; Scale/2.00)
    bookshelf/0.8.0 (iPhone; iOS 9.1; Scale/3.00)
    bookshelf/0.8.0 (iPhone; iOS 9.1; Scale/2.00)
    bookshelf/0.8.0 (iPhone; iOS 9.0.2; Scale/2.00)
    bookshelf/0.8.0 (iPhone; iOS 9.0; Scale/2.00)
    node-superagent/1.3.0
    bookshelf/0.8.0 (iPad; iOS 7.1.2; Scale/2.00)
    Mozilla/5.0 (Linux; Android 4.2.2; GT-I9505 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36
    bookshelf/0.8.0 (iPhone; iOS 9.0.2; Scale/3.00)
    bookshelf/0.8.0 (iPhone; iOS 8.1; Scale/2.00)
    bookshelf/0.8.0 (iPhone; iOS 8.3; Scale/2.00)
    bookshelf/0.8.0 (iPhone; iOS 8.4.1; Scale/2.00)
    okhttp/2.5.0
    bookshelf/0.8.0 (iPod touch; iOS 9.1; Scale/2.00)
    >>>
```



#### Mongo server start error solution


```
    ps wuax | grep mongo
```



You should see something that looks like this


```
    User   31936   0.5 0.4 2719784 35624   ?? S     7:34pm   0:09.98 mongod

    User   31945   0.0 0.0 2423368   184 s000 R+   8:24pm   0:00.00 grep mongo
```



Now enter the kill command for the mongod instance (31936 in this case):


```
    kill 31936
```



#### MongoDB的启动和关闭

  * 以守护进程方式启动
进入bin目录

        ./mongod



```
  * 打开客户端

        ./mongo
```



  * 关闭服务
客户端下

        db.shutdownServer()



```
  * 退出客户端

        exit
```






> 删除当前使用数据库 db.dropDatabase();
> 
> 删除collection

drop() 命令的基本语法如下


```
    db.COLLECTION_NAME.drop()
```



#### MongoDB导出数据


```
    $ mongoexport --db douban  --collection books --out douban9plusbooks.json

    $ mongoexport --host 192.168.200.20 --db bookshelf --username '***' --password '***' --collection book --out workspace/MongoDBexport/TOPin.csv

    $ mongoexport --host=192.168.100.3 --port=27019 --db=master --collection=data --query='{"spider":"6w"}' --fields="data.ISBN" --type=csv --out=dataISBN.csv
```



#### MongoDB拷贝数据

1 开启mongo 服务器


```
    $ sudo mongod

    password:
```



2 开启mongo 客户端


```
    $ mongo

    > db.copyDatabase("douban", "douban", "192.168.1.156", "jt", "***")
```



3 说明


```
    db.copyDatabase(fromdb,todb,fromhost,username,password,mechanism)


    db.copyDatabase
```



**_password: 有密码就输入密码，没有就为空字符串”“._**

#### Mongodb insert_many


```
    > db.collection.insert_many

    insert_many

    >>>db.test.count()

    0

    >>>result=db.test.insert_many([{'x':i}foriinrange(2)])

    >>>result.inserted_ids

    [ObjectId('54f113fffba522406c9cc20e'), ObjectId('54f113fffba522406c9cc20f')]

    >>>db.test.count()
```

```