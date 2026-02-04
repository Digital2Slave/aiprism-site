# Node.js

### Node Project

#### One

> 接手项目如何去分析目录，找入口，如何调试代码。

  1. git clone ***.git** ，并进入根目录；
  2. 读 **README.md** 文件，安装项目需要的模块，并运行；
  3. 查看 **package.json** 查看项目框架，找到主程序；
  4. 安装**Google Chrome** 插件**Postman** ，用于调试**api** 接口部分代码；
  5. 不懂的地方先**Google** ，没有找到解决方法时，则马上向**项目相关同事** 咨询，推进项目进度。



#### Two

> 项目缺少某个模块。

找到项目文件夹后，一般在**根目录** 下面安装项目所需的依赖包。使用如下命令：   
`npm install`

  1. 模块保存到项目下面的**node_modules** 文件夹里面。   
`npm install <模块名@版本号>`

  2. 模块保存到全局变量中。   
`sudo npm install -g <模块名@版本号>`

  3. 模块保存到package.json的**dependencies** 里面。   
`npm install --save <模块名@版本号>`

> 有时候项目一运行就提示**不能找到某个模块** 类似**module.js** 内部的错误,   
>  其实，这个时候就应该加上**–save** , 这样就对了 **:)** 。

  4. 模块保存到package.json的**devDependencies** 里面。   
`npm install --save-dev <模块名@b版本号>`




#### Three

> 主动沟通，写好注释，让使用者能够用最小的代价去使用你的代码或API。

  1. 写Node.js前, 翻看[JavaScript编程规范](https://github.com/fex-team/styleguide/blob/master/javascript.md#1-%E5%89%8D%E8%A8%80).
  2. 在考虑使用者最小代价使用所实现功能(**API**)的前提下，思考编程逻辑。
  3. 直接 **代码逻辑** 、**本地配置** 、**数据库配置** 3种方式的优劣分析； 
  4. 表的设计从**增、删、改、查** 操作去分析优劣。 



### Node中间件

#### 如何获取Request完整URL


```
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
```



#### 如何获取Request请求方法


```
    var reqMethod = req.method;
    // reqMethod is like 'POST', 'GET'
```



#### 正则表达式和筛选字符串子串


```
    tianzhaixing@mbp:~|⇒  node
    > var strUrl = 'name:tianzhaixing, age:28, female';
    undefined
    > var reg = /female/;
    undefined
    > console.log(reg.test(strUrl));
    true
    undefined
    > var strUrl = 'name:tianzhaixing, age:28, male';
    undefined
    > var reg = /female/;
    undefined
    > console.log(reg.test(strUrl));
    false
    undefined
    > var lastIndex = strUrl.lastIndexOf('m');
    undefined
    > console.log(lastIndex);
    27
    undefined
    > var sexVal = strUrl.slice(lastIndex, strUrl.length);
    undefined
    > console.log(sexVal);
    male
    undefined
    > .exit
    tianzhaixing@mbp:~|⇒
```



#### Next…