let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');

module.exports = {
    mode: 'production', //production development
    entry: {
        home: './src/index.js' ,
        other: './src/other.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    watch: true,
    watchOptions:{
        poll: 1000,
        aggregateTimeout:500,
        ignored: /node_modules/
    },
    // 我试了这3个都产生了map文件，而且生产环境没有达到映射的目的？？？？
    devtool: 'source-map', // 会产生map文件，dev下能定位到原位置， build后定位不到原位置，视频上可以定位的原位置的
    // devtool: 'evel-source-map' ,// 不会产生map 文件, 但是我的产生了
    // devtool: 'cheap-module-source-map', 
    plugins:[
        new webpack.DefinePlugin({
            ENV: JSON.stringify('dev'), // 转化为字符串,否则会认为是个变量
            FLAG: 'true',
            EXPRESSION: '2+2'
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: 'index.html', 
            hash: true,
            chunks: ['home']
          }) //,
        // new HtmlWebpackPlugin({
        //     template: './src/other.html',
        //     filename: 'other.html',
        //     chunks:['home', 'other']
        // })
    ],
    resolve: {
        extensions:['.js','.css','./json'], // 类型寻找优先级
        modules: [path.resolve('node_modules'), path.resolve('common')],
        mainFields: ['style', 'main'], // 优先找style
        // mainFiles: [] // 指定入口文件的名子， 如果没指定默认index.js
        alias: { // 别名
            bootstrap: 'bootstrap/dist/css/bootstrap.css'
        }
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                use :["style-loader","css-loader"]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets: ["@babel/preset-env"]
                    }
                }
            }

        ]
    }
}