# Python SQL learning

DBMS : DataBase Management System 数据库管理系统  
Python: sqlite3 relational database 关系型数据库  
API : Application Programming Interface 应用程序编程接口  
  
import sqlite3 as dbapi  
  
Python Program --(SQL命令)--> DBMS(pysqlite) ----> database  
  


  


  



```sql
    Python 2.7.6 (default, Nov 10 2013, 19:24:18) [MSC v.1500 32 bit (Intel)] on win
    32
    Type "help", "copyright", "credits" or "license" for more information.
    >>> import sqlite3 as dbapi
    >>> con = dbapi.connect('population.db')
    >>> cur = con.cursor()
    >>> cur.execute('CREATE TABLE PopByRegion(Region TEXT, Population INTEGER)')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.execute('INSERT INTO PopByRegion VALUES("Central Africa", 330993)')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.execute('INSERT INTO PopByRegion VALUES("Southeastern", 743112)')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.execute('INSERT INTO PopByRegion VALUES("Northern Africa", 1037463)')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.execute('INSERT INTO PopByRegion VALUES("Southern Asia", 2051941)')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.execute('INSERT INTO PopByRegion VALUES("Asia Pacific", 785468)')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.execute('INSERT INTO PopByRegion VALUES("Middle East", 687630)')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.execute('INSERT INTO PopByRegion VALUES("Eastern Asia", 1362955)')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.execute('INSERT INTO PopByRegion VALUES("Southern America", 593121)')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.execute('INSERT INTO PopByRegion VALUES("Eastern Europe", 223427)')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.execute('INSERT INTO PopByRegion VALUES("North America", 661157)')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.execute('INSERT INTO PopByRegion VALUES("Western Europe", 387933)')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.execute('INSERT INTO PopByRegion VALUES("Japan", 100562)')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> con.commit()
    >>> cur.execute('SELECT Region, Population FROM PopByRegion')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> print cur.fetchone()
    (u'Central Africa', 330993)
    >>> con.text_factory = str
    >>> print cur.fetchone()
    (u'Southeastern', 743112)
    >>> cur.text_factory = str
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    AttributeError: 'sqlite3.Cursor' object has no attribute 'text_factory'
    >>> con.text_factory = str
    >>> print cur.fetchone()
    ('Northern Africa', 1037463)
    >>> print cur.fetchall()
    [('Southern Asia', 2051941), ('Asia Pacific', 785468), ('Middle East', 687630),
    ('Eastern Asia', 1362955), ('Southern America', 593121), ('Eastern Europe', 2234
    27), ('North America', 661157), ('Western Europe', 387933), ('Japan', 100562)]
    >>> cur.execute('SELECT Region, Population FROM PopByRegion ORDER BY Region')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.fetchall()
    [('Asia Pacific', 785468), ('Central Africa', 330993), ('Eastern Asia', 1362955)
    , ('Eastern Europe', 223427), ('Japan', 100562), ('Middle East', 687630), ('Nort
    h America', 661157), ('Northern Africa', 1037463), ('Southeastern', 743112), ('S
    outhern America', 593121), ('Southern Asia', 2051941), ('Western Europe', 387933
    )]
    >>> cur.execute('SELECT Region, Population FROM PopByRegion ORDER BY Population
    DESC')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.fetchall()
    [('Southern Asia', 2051941), ('Eastern Asia', 1362955), ('Northern Africa', 1037
    463), ('Asia Pacific', 785468), ('Southeastern', 743112), ('Middle East', 687630
    ), ('North America', 661157), ('Southern America', 593121), ('Western Europe', 3
    87933), ('Central Africa', 330993), ('Eastern Europe', 223427), ('Japan', 100562
    )]
    >>> cur.execute('SELECT Region FROM PopByRegion')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.fetchall()
    [('Central Africa',), ('Southeastern',), ('Northern Africa',), ('Southern Asia',
    ), ('Asia Pacific',), ('Middle East',), ('Eastern Asia',), ('Southern America',)
    , ('Eastern Europe',), ('North America',), ('Western Europe',), ('Japan',)]
    >>> cur.execute('SELECT * FROM PopByRegion')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.fetchall()
    [('Central Africa', 330993), ('Southeastern', 743112), ('Northern Africa', 10374
    63), ('Southern Asia', 2051941), ('Asia Pacific', 785468), ('Middle East', 68763
    0), ('Eastern Asia', 1362955), ('Southern America', 593121), ('Eastern Europe',
    223427), ('North America', 661157), ('Western Europe', 387933), ('Japan', 100562
    )]
    >>> cur.execute('SELECT Region FROM PopByRegion WHERE Population > 1000000')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.fetchall()
    [('Northern Africa',), ('Southern Asia',), ('Eastern Asia',)]
    >>> cur.execute('SELECT Region FROM PopByRegion WHERE Population > 1000000 AND R
    egion < "L" ')
    <sqlite3.Cursor object at 0x01A066E0>
    >>> cur.fetchall()
    [('Eastern Asia',)]
    >>>
```



  
```