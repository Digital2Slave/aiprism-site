# Python-module

### repeat


```
    In [1]: from itertools import repeat
    In [2]: x = list(repeat(0,times=10))
    In [3]: x
    Out[3]: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
```



### OrderedDict

按照书写顺序输出字典中的元素


```
    from collections import OrderedDict
    orderdict1 = OrderedDict()
    content = ((key1,val1), (key2,val2), (key3,val3))
    orderdict2 = OrderedDict(content)
```



### filter


```
    Help on built-in function filter in module __builtin__:

    filter(...)

    filter(function or None, sequence) -> list, tuple, or string

    Return those items of sequence for which function(item) is true. If

    function is None, return the items that are true. If sequence is a tuple

    or string, return the same type, else return a list.

    (END)
```



### CSV

#### read


```
    import csv
    csvfile = file(inputfile, 'rb')
    csvreader = csv.reader(csvfile)
    for line in csvreader:
        ISBN.append(line[0])
    csvfile.close()
```



#### write


```
    import csv
    #ASIN and isbns are list with the same of length.
    Asinfile = file(outputfile,'wb')
    Asinwriter = csv.writer(Asinfile)
    rowdata = []
    for i in xrange(len(ASIN)):
        data = [isbns[i], ASIN[i]]
    rowdata.append(data)
    Asinwriter.writerows(rowdata)
    Asinfile.close()
```



### codecs & unicodedata

文件字符编码问题


```
    import codecs
    file = codecs.open("lol", "w", "utf-8")
    file.write(u'\ufeff')
    file.close()

    import unicodedata
    isbn = unicodedata.normalize('NFKD', isbn).encode('utf-8','ignore')
```



### sys


```
    import sys
    sys.setrecursionlimit(150) #设置递归深度
```



### argparse


```
    import argparse
    '''
    input : argv[1] or image path
    output: book spine segment images which store in './Example/Dst'
    Usage :    $ python.py --image=
    eg:
    $ python main.py --image='./Example/Src/002.jpg'
    '''

    # Load image for command line operator
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--image", required = True, help = "Path to the image")
    args = vars(ap.parse_args())
    InputImg = cv2.imread(args["image"])
    # "./Example/Src/002.jpg"
```



### OptionParser


```
    from optparse import OptionParser

    parser = OptionParser()

    parser.add_option("-i", "--input",  action="store", dest="DateTimeFile", help="Load datetime file.")

    parser.add_option("-o", "--output1", action="store", dest="bookbid",  help="Write changing of book id.")

    parser.add_option("-f", "--output2", action="store", dest="userid",      help="Write changing of user id.")

    (options,args) = parser.parse_args()

    DateTimeFile  = options.DateTimeFile
    bookbid       = options.bookbid
    userid        = options.userid
```



……