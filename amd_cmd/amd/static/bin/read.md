
### 资源geithub下载地址
- https://github.com/requirejs/requirejs
- https://github.com/requirejs/text
- https://github.com/guybedford/require-css
- https://github.com/requirejs/i18n
- https://github.com/requirejs/r.js

- 单文件打包
> r.js cmd -o baseUrl=js name=app out=build.js
- 单独打包css
> node r.js -o cssIn=../src/css/common.css out=../dist/css/common.css

- 通过配置文件打包多文件
> node r.js -o app.build.js

通过npm打包
> npm run build  

## optimizeCss 参数设置
none   不压缩，仅合并
standard  标准压缩 去换行、空格、注释
standard.keepLines除标准压缩外，保留换行
standard.keepComments除标准压缩外，保留注释
standard.keepComments.keepLines除标准压缩外，保留换行和注释

同时监听两条命令
使用concurrent 模块实现同时监听执行两条命令
npm install concurrently --save
然后在package.json里面的 "script" 里面的 "start"
"start": "concurrently \"npm run json\" \"npm run dev\"",


接下来看下r.js的配置文件





