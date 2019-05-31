## webpack 手动配置项目
## webpack webpack-cli
```
yarn add webpack webpack-cli -S -D
```
## js:  babel-loader
```
yarn add babel-loader @babel/core @babel/preset-env @babel/runtime @babel/plugin-transform-runtime -S -D

```
## css: css-loader style-loader
-less: less-loader less
-sass: asss-less 
```
yarn add css-loader style-loader postcss-loader postcss-loader less sass-loader sass stylus-loader -S -D
```
## vue： vue-loader 解析vue文件
```
yarn add vue-loader  vue-template-compiler -S -D
```

## html:  html-webpack-plugin   把html文件自动打包进去
```
yarn add html-webpack-plugin -S -D
```
## clean-webpack-plugin  打包前先清空dist目标文件夹
```
yarn add clean-webpack-plugin -S -D
```

## webpack-dev-server 在内存打包并启动http服务
```
yarn add webpack-dev-server -S -D
```
配置webpack
在根目录下创建 webpack.config.js 文件
``` javascript
let path =  require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	mode: "development",
	entry: './src/main.js',           // 指定入口文件
	output:{                          // 打包后的输出文件配置
		filename: 'bundle.js',     // 可以指定路径 'js/bundle.js', 也可以生成hash值 'bundle[hash].js
		path: path.resolve('./dist')  // 这里一定要用绝对路径
	},
	plugins:[] // 插件
}
```

使用插件html-webpack-plugin
``` javascript
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
plugins:[
		new CleanWebpackPlugin(), // 打包前先清空目标文件夹
		new HtmlWebpackPlugin({
			// filename: 'html/index.html', // 可以配置生成的路径和文件名
			template: "./src/index.html",
			title:"vue首页",                    // html的title
			minify:{                            // 压缩配置：
				removeAttributeQuotes:true,     // 去除引号
				collapseWhitespace:true         // 空格
			},
			hash:true                           // 引入的资源添加hash，来防止缓存
		})
	]
```
## loader的配置
``` javascript
module:{
		rules:[
			{
				test: /\.js$/,
				execude: /node_modules/, //不要的
				include：'',  // 要的
				use: {
					loader: 'babel-loader',
					options: {
					  presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/,
				// use:['style-loader','css-loader','postcss-loader'] //从右到左
				use:['vue-style-loader', 'css-loader'] // 如果时vue项目，就不要用后面的loader了，否则报错
			},
			{
				test: /\.less$/,
				use:['style-loader','css-loader','postcss-loader', 'less-loader']
			},
			{
				test: /\.[jpg|jpeg|png|gif]$/i,
				use: 'url-loader?limit=1024' // 限制图片大小，超出后抽离出文件
			},
			{
				test: /\.vue$/,
				use:"vue-loader" // 如果时vue项目，
			}
		]
	},
```

## webpack-dev-server 的使用
``` javascript
 devServer:{
		port: 8080,                  //指定端口号
		compress: true,             // 是否压缩
		contentBase: './dist'       //指定目录
	},
```
