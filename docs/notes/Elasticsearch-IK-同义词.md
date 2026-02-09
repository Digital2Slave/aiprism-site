# Elasticsearch IK 同义词

### 同义词配置

#### step 1

`elasticserach.yml` 最后一行添加：   
`index.analysis.analyzer.default.type: ik`

#### step 2

在`elasticsearch-2.3.1/config`目录下面，存放`synonyms.txt`

其中，synonyms.txt 编码格式为’utf-8’，内容为：


```
  #Example:
  ipod, i-pod, i pod
  foozball , foosball
  universe , cosmos
  西红柿, 番茄
  马铃薯, 土豆
  aa, bb
```

#### step 3

新建立索引类型设置


```json
    curl -XPUT localhost:9200/test/_mapping?pretty -d '
    {
      "settings": {
        "index": {
          "analysis": {
            "analyzer": {
              "jt_cn": {
                "type": "custom",
                "use_smart": "true",
                "tokenizer": "ik_smart",
                "filter": ["jt_tfr","jt_sfr"],
                "char_filter": ["jt_cfr"]
              },
              "ik_smart": {
                "type": "ik",
                "use_smart": "true"
              },
              "ik_max_word": {
                "type": "ik",
                "use_smart": "false"
              }
            },
            "filter": {
              "jt_tfr": {
                "type": "stop",
                "stopwords": [" "]
              },
              "jt_sfr": {
                "type": "synonym",
                "synonyms_path": "synonyms.txt"
              }
            },
            "char_filter": {
                "jt_cfr": {
                    "type": "mapping",
                    "mappings": [
                        "| => \\|"
                    ]
                }
            }
          }
        }
      },
      "mappings": {
        "solution": {
          "properties": {
            "title": {
              "include_in_all": true,
              "analyzer": "jt_cn",
              "term_vector": "with_positions_offsets",
              "boost": 8,
              "store": true,
              "type": "string"
            }
          }
        }
      }
    }
    '
```

#### step 4


```json
    curl -XPUT localhost:9200/test/solution/1 -d '
    {
        "title": "番茄"
    }
    '
    curl -XPUT localhost:9200/test/solution/2 -d '
    {
        "title": "西红柿"
    }
    '
```

#### step 5


```json
      curl -XPOST 'localhost:9200/test/solution/_search?pretty' -d '
       {
         "query": {
           "query_string": {
             "title": {
               "query": "西红柿",
               "analyzer": "jt_cn"
             }
           }
         },
         "highlight": {
           "pre_tags": [
             "<tag1>",
             "<tag2>"
           ],
           "post_tags": [
             "</tag1>",
             "</tag2>"
           ],
           "fields": {
             "title": {}
           }
         }
       }
       '
```


#### step 6


```json
       {
         "took": 3,
         "timed_out": false,
         "_shards": {
           "total": 5,
           "successful": 5,
           "failed": 0
         },
         "hits": {
           "total": 2,
           "max_score": 0.4500804,
           "hits": [
             {
               "_index": "test",
               "_type": "solution",
               "_id": "1",
               "_score": 0.4500804,
               "_source": {
                 "title": "西红柿"
               }
             },
             {
               "_index": "test",
               "_type": "solution",
               "_id": "2",
               "_score": 0.36006433,
               "_source": {
                 "title": "番茄"
               }
             }
           ]
         }
       }
```

### 动态更新同义词文件

[手动动态更新方法](http://dev.paperlesspost.com/setting-up-elasticsearch-synonyms/27)

[自动动态更新插件](https://github.com/bells/elasticsearch-analysis-dynamic-synonym)