# Linux删除带空格的文件


    $ find . -name " (2).jpg" -print0 | xargs -0 rm