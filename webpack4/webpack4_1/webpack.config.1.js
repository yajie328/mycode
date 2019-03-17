let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devServer: { // 开发服务器配置
		port: 3000,  // 指定端口号
		progress: true, // 打包能看到进度条
		contentBase: './build' //默认当前指定目录打开静态服务

	},
	mode: 'development', // 默认两种 production development
	entry :'./src/index.js'  ,  // 入口
	output: {
		filename: 'bundle.[hash:8].js' ,  // 打包后的文件名
		path: path.resolve(__dirname,'build'), // 打包后的路径，必须是一个绝对路径 __dirname 表示当前目录
	},
	plugins: [ // 数组 放着所有webpack的插件
		new HtmlWebpackPlugin({
			template: "./src/index.html",  // 指定模板文件
			filename: 'index.html',   // 打包后的文件名
			minify: {
				removeAttributeQuotes: true, // 去掉属性的引号
				collapseWhitespace: true //折叠行
				
			},
			hash: true  // 防止缓存

		})
	],
	module:{  // 模块
		rules: [ // 规则 css-loader 解析@inport这样语法
					//style-loader 把解析的css插入到head中
					//loader的特点： 处理单一
					// loadaer的用法： 字符串异能用一个loader
					// 多个loader的顺序，数组 默认从右向左执行
					//loader还可以写成 对象形式 use:[{loader:'style-loader', .... }], 这样可以多配置
			{
				test: /\.css$/,    // 正则找到css结尾的文件
				use: [             // 用哪些loader来解析 
						{
							loader:'style-loader',
							options: {
								insertAt: 'top' // 查到顶部，这样不会覆盖之前的样式
							}
						},
						'css-loader'
					] 
			},
			{ // 处理less   安装 less less-loader
				// sass 安装 node-sass sass-loader
				// stylus 安装 style style-loader
				test: /\.less$/,    // 正则找到css结尾的文件
				use: [             // 用哪些loader来解析 
						{
							loader:'style-loader',
							options: {
								insertAt: 'top' // 插到顶部，这样不会覆盖之前的样式
							}
						},
						'css-loader', // @import 解析路径
						'less-loader' // 把less-> css
					] 
			}

		]


	}
}