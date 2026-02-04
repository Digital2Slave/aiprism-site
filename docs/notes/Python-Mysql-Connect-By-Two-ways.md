# Python Mysql Connect By Two ways

本文提出两种不同的Python方法来链接服务器上面的MySQL数据库。

  *

  * 如果，你是拥有服务器管理员权限的 **高富帅** ，你可以使用第一种比较常用的方式链接MySQL数据库；
  * 如果，你是只拥有服务器普通权限的 **屌丝** ，第一种方式你可能不能使用，请使用第二种方式链接MySQL数据库；




> 如果，你是普通用户权限，却可以用第一种方式链接MySQL数据库。可能是，管理员仁慈的在服务器公共区域安装了 **Python-MySQLdb** 模块。请心怀感恩:) 

#### Method_1


```sql
    # -*- encoding:utf-8 -*-
    import sys
    import MySQLdb
    from MySQLdb.cursors import SSDictCursor
    reload(sys)
    sys.setdefaultencoding('utf-8')

    host = 'yourhost'
    port = 3306  # 数值类型
    database = 'yourdb'
    user = 'youruser'
    password = 'youruserpassword'

    sql_select = """
    SELECT `id`, title
    FROM test
    WHERE `status`=1;
    """

    db1 = MySQLdb.connect(
        host,
        user,
        password,
        database,
        port=port,
        charset='utf8',
        cursorclass=SSDictCursor
    )
    cs1 = db1.cursor()
    cs1.execute(sql_select)

    db2 = MySQLdb.connect(
        host,
        user,
        password,
        database,
        port=port,
        charset='utf8'
    )
    db2.autocommit(True)
    cs2 = db2.cursor()

    #TODO

    cs2.close()
    db2.close()

    cs1.close()
    db1.close()
```
sql


#### Method_2


```sql
    # -*- encoding:utf-8 -*-
    import sys
    import mysql.connector
    from mysql.connector.cursor import MySQLCursorDict
    reload(sys)
    sys.setdefaultencoding('utf-8')

    host = 'yourhost'
    port = 3306  # 数值类型
    database = 'yourdb'
    user = 'youruser'
    password = 'youruserpassword'

    sql_select = """
    SELECT `id`, title
    FROM test
    WHERE `status`=1;
    """

    db1 = mysql.connector.connect(
        user=user,
        password=password,
        host=host,
        database=database,
        port=port,
        charset='utf8'
    )
    cs1 = db1.cursor(cursor_class=MySQLCursorDict)
    cs1.execute(sql_select)

    db2 = mysql.connector.connect(
        user=user,
        password=password,
        host=host,
        database=database,
        port=port,
        charset='utf8',
        autocommit=True
    )
    cs2 = db2.cursor(cursor_class=MySQLCursorDict)

    # TODO

    cs2.close()
    db2.close()

    cs1.close()
    db1.close()
```
