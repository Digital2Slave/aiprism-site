# 《Head First Programming》---python 6_模块化编程

本章主要是利用模块化编程，实现相同代码在不同环境下的应用。

模块化编程是一个很好的编程习惯，有利于维护自己的代码和及时添加需要的功能。

1. transactions.py模块


```python
    def save_transaction(price, credit_card, description):
        file = open("transactions.txt", "a") # "a"表示在文本末尾追加
        file.write("%07d%16s%16s\n" % (price * 100, credit_card, description))
        file.close()
```

2.promotion.py模块


```python
    def discount(price):
        return 0.9 * price
```

3.starbuzz.py模块


```python
    def discount(price):
        return 0.95 * price
```
  
4.coffee_pos.py应用函数


```python
    from transactions import * #可以不加模块名调用transactions模块内的函数
    import promotion           #需要加模块名调用promotion模块内的函数
    import starbuzz            #需要加模块名调用starbuzz模块内的函数

    items = ["DONUT", "LATTE", "FILTER", "MUFFJN"]
    prices = [1.50, 2.20, 1.80, 1.20]
    running = True

    while running:
        option = 1
        for choice in items:
            print(str(option) + ". " + choice)
            option = option + 1
        print(str(option) + ". Quit")
        choice = int(input("Choose an option: "))
        if choice == option:
            running = False
        else:
            credit_card = input("Credit card number: ")
            price = promotion.discount(prices[choice - 1])
            if input("Starbuzz card ? ") == "Y":
                price = starbuzz.discount(price)
            save_transaction(price, credit_card, items[choice - 1])
```

5.程序运行结果：


```python
    Python 3.3.5 (v3.3.5:62cf4e77f785, Mar  9 2014, 10:37:12) [MSC v.1600 32 bit (Intel)] on win32
    Type "copyright", "credits" or "license()" for more information.
    >>> ================================ RESTART ================================
    >>>
    1. DONUT
    2. LATTE
    3. FILTER
    4. MUFFJN
    5. Quit
    Choose an option: 5
    >>> ================================ RESTART ================================
    >>>
    1. DONUT
    2. LATTE
    3. FILTER
    4. MUFFJN
    5. Quit
    Choose an option: 2
    Credit card number: 5413765853576543
    Starbuzz card ? N
    1. DONUT
    2. LATTE
    3. FILTER
    4. MUFFJN
    5. Quit
    Choose an option: 4
    Credit card number: 5413765853576543
    Starbuzz card ? N
    1. DONUT
    2. LATTE
    3. FILTER
    4. MUFFJN
    5. Quit
    Choose an option: 2
    Credit card number: 5413765853576543
    Starbuzz card ? Y
    1. DONUT
    2. LATTE
    3. FILTER
    4. MUFFJN
    5. Quit
    Choose an option: 5
    >>>
```


6. 字符串格式化输出

%16s: 显示16字符长的字符串

%e: 科学计数法显示数字

%7d: python默认以空格填充的7字符长的整数数值

%07d: 以0填充的7字符长的整数数值

%x: 16进制显示数字

%4.2f: 4位字符长表示小数的左边，2位字符长表示小数的右边，浮点型数值

如果只用一个值需要格式化，就不需要用圆括号把它括起来。

eg: print("%x" % 127)

print("%s %e" % ("Value is", 16.0**0.5))

16.0**0.5 相当于对16.0开平方  
