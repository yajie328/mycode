let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizecssPlugin = require('optimize-css-assets-webpack-plugin');
let UglifyjsPlugin = require('uglifyjs-webpack-plugin');
let Webpack = require('webpack');

module.exports = {
	optimization:{
		minimizer: [
			new UglifyjsPlugin({
				// cache: true,  // 是否缓存
				// paraller: true, // 是否并发打包
				// sourceMap: true // 源码映射，便于查找问题位置
			}),
			new OptimizecssPlugin()
		]
		
	},
	devServer: { 
		port: 3000, 
		progress: true,
		contentBase: './build'

	},
	mode: 'development', 
	entry :'./src/index.js'  , 
	output: {
		filename: 'bundle.js' , 
		path: path.resolve(__dirname,'build') // 打包后的输出目录 
		// publicPath: "http://daya.com/"
	},
	plugins: [ 
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: 'index.html', 
			minify: {
				removeAttributeQuotes: true, 
				collapseWhitespace: true
			},
			hash: true 
		}),
		// new Webpack.ProvidePlugin({ // 在每个模块中都注入$
		// 	$: 'jquery'
		// }),
		new MiniCssExtractPlugin({  
			filename: 'css/main.css' // 指定css打包目录及文件名
		})
		
	],
	externals: {
		jquery: "$"   //  全局引入3： 如果引入了jquery就忽略掉就行了，不打包进去
	},
	module:{ 
		rules: [
			// {
			// 	test:require.resolve('jquery'), // 全局引入2 引入文件中 并暴漏  和在 index.js中效果一样
        	// 	use:'expose-loader?$'
				
			// },
			//loader 默认 是从右向左执行 从下到上
			// {
			// 	test: /\.js$/,    
			// 	use: {
			// 		loader: 'eslint-loader', // 语法检查
			// 		options: {
			// 			enforce: 'pre' // 强制比下个先执行 previous post（后执行）

			// 		}
			// 	}
			// },
			{
				test: /\.html$/,
				use: 'html-withimg-loader'
			},
			{ // 处理js中的图片
				test: /\.(jpg|png|jpeg|gif)$/,
				// use:"file-loader"
				// 做一个限制 当我们图片小于多少K的时候 用base64来转化
				use: [{
					loader: 'url-loader',
					options:{
						limit: 20,
						outputPath: 'img/',
						publicPath: "http://www.daya.com/img/"
					}
				}] 
			},

			{
				test: /\.js$/,   //normal 普通的loader  
				use: [ {
						loader: 'babel-loader',
						options: { // 用babel-loader 需要将es6 -> es5
							presets: [
								'@babel/preset-env'
							],
							plugins:[
								["@babel/plugin-proposal-decorators", { "legacy": true }], //解析装饰器
								["@babel/plugin-proposal-class-properties", { "loose" : true }], // 解析类属性
								"@babel/plugin-transform-runtime"
							],
						},
					}
				],
				include: path.resolve(__dirname, 'src'), // 包括
				exclude: /node_modules/  // 排除
			},
			{
				test: /\.css$/,    
				use: [             
						MiniCssExtractPlugin.loader, 
						'css-loader',
						'postcss-loader'
						
					] 
			},
			{ 
				test: /\.less$/,
				use: [      
						MiniCssExtractPlugin.loader,
						'css-loader',
						'postcss-loader', 
						'less-loader'
					] 
			}

		]
	}
}