let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizecssPlugin = require('optimize-css-assets-webpack-plugin');
let UglifyjsPlugin = require('uglifyjs-webpack-plugin');


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
	mode: 'production', 
	entry :'./src/index.js'  , 
	output: {
		filename: 'bundle.js' , 
		path: path.resolve(__dirname,'build'), 
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
		new MiniCssExtractPlugin({   // 生成样式文件到生
			filename: 'main.css' // 抽离出的文件名
		})
	],
	module:{ 
		rules: [ 
			{
				test: /\.css$/,    
				use: [             
						MiniCssExtractPlugin.loader, //
						'css-loader',
						'postcss-loader'
						
					] 
			},
			{ 
				test: /\.less$/,
				use: [      
						MiniCssExtractPlugin.loader,
						'css-loader',
						'postcss-loader', // 补齐前缀 例如 -webkit-
						'less-loader'
					] 
			}

		]
	}
}