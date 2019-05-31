## node为了实现模块 就在文件外面套了一个函数
> 模块化 sea.js cmd requirejs amd (前端模块) 废弃了

> es6Module import export
> commonjs

- 模块的规范（为了函数）
    - 1) 一个文件就是一个模块
    - 2）每个文件都可以到处自己 module.exports
    - 3) 别人享用这个模块可以引入进来 rquire

    - 好处： 命名冲突 单例模式（可以把自己的代码放到对象里维护）不能完美解 决 而且会导致调用时代码过长

> 自执行函数 可以解决
> require是同步的

## 核心模块 path  专门用来处理文件路径的
- extname 去后缀名
- basename 去文件名（需要扩展名） 
- join 拼接 
- resolve 解析绝对路径 
- dirname 取父路径
- 代码演示：

```
```

## fs

## vm 模块 沙箱 测试环境 和外界完全隔离

## 模块的实现
require
mod.require
Module._load 模块的加载
Module._resolveFilename 解析文件的名字  获取文件的绝对路径
Module._cache 做一个模块的缓存  没有缓存创建模块
new Module(filename, parent);没有模块就创建一个模块  id =文件名,exports 当前的{}
Module._cache[filename] = module; // 把模块缓存起来
tryModuleLoad 尝试加载模块
module.load 加载模块
获取扩展名 
Module._extensions 加载模块 对象 .js .json
module._compile 给模块添加闭包
Module.wrap 包裹

## 文件模块 自定义模块
- require('./xxx')
- require(绝对路径)
> let r = require('./a');  // 每个node版本寻找顺序不一样,
> node8 会优先找当前目录下的a.js, 然后和找a文件夹下的index.js
> 现在会全部查找a.js文件，文件不存在 才会找a文件夹
> 避免：不能文件夹和文件名字相同
> 如果文件夹中有package.json 会先查找main 的指向，（没有找index.js index.json)

## 核心模块
require('fs')

## 第三放模块（需要安装）
- 全局安装 promises-aplus-test -g (在命令行中)
- 本地安装 require('bluebird') 
- require('a')  
- 查找顺序: 回去当前目录下查找node_modeles文件夹， 如果没找到 则向上一级查找 找不到报错 (module.paths)
> package.json 如下
```
{
  "name": "a",         // 包名
  "version": "1.0.0",  
  "description": "",  // 描述
  "main": "1.js",     // 入口文件
  "scripts": {       
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],      //能搜到这个包的关键字
  "author": "",
  "license": "MIT"     //协议  (开源)
}
```

## 如何定义全局包 (包是模块的集合)
- 包必须有package.json
- 在命令行里用的
- npm link  链接到本地
- 运行方式 #! /usr/bin/env node
```
bin: {
    command: './entry.js'
}
```
发布包 （先去官网（nrm, npm nvm)

```
npm install nrm -g  安装nrm 切换源
nrm ls  列出所有源
nrm use npm 切换到官方
npm config list
nrm use cnpm 
npm config list

nrm use npm  
npm test  测试哪个源比较快

npm login
npm addUser  先注册

npm publish  发布到npm.org

npm unlink

handsome  找不到了

npm install -g hansome-server

handsome

// 如果需要更新包 需要提升版本号
npm publish
npm unpublish --force 卸载包



```

## yarn 包管理器
> yarn 需要npm来安装
```
sudo npm instal yarn -g
yarn add jquery -g -d
yarn remove XXX --dev 
```










- 
