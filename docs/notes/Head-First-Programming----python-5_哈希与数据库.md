# 《Head First Programming》---python 5_哈希与数据库

本章主要利用python的哈希(字典)和自带数据库sqlit3实现对外部数据库的访问，并显示相关的查找内容。


1.实现代码如下所示：


```python
    import sqlite3

    def find_details(id2find):
        db = sqlite3.connect("surfersDB.sdb")
        db.row_factory = sqlite3.Row
        cursor = db.cursor()
        cursor.execute("select * from surfers")
        rows = cursor.fetchall()
        for row in rows:
            if row['id'] == id2find:
                s = {}
                s['id']      = str(row['id'])
                s['name']    = row['name']
                s['country'] = row['country']
                s['average'] = str(row['average'])
                s['board']   = row['board']
                s['age']     = str(row['age'])
                cursor.close()
                return(s)
        cursor.close()
        return({})

    lookup_id = int(input("Enter the id for the surfer: "))
    surfer = find_details(lookup_id)

    if surfer:
        print("ID:         " + surfer['id'])
        print("Name:       " + surfer['name'])
        print("Country:    " + surfer['country'])
        print("Average:    " + surfer['average'])
        print("Board type: " + surfer['board'])
        print("Age:        " + surfer['age'])
    else:
        print("None, Please check out the input id!")
```
  
2.运行结果： 


```python
    Python 2.7.6 (default, Nov 10 2013, 19:24:18) [MSC v.1500 32 bit (Intel)] on win32
    Type "copyright", "credits" or "license()" for more information.
    >>> ================================ RESTART ================================
    >>>
    Enter the id for the surfer: 102
    ID:         102
    Name:       Juan Martino
    Country:    Spain
    Average:    9.01
    Board type: Gun
    Age:        36
    >>> ================================ RESTART ================================
    >>>
    Enter the id for the surfer: 119
    None, Please check out the input id!
    >>>
```