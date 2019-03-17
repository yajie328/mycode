// webpack.config.base.js
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let CopyWeabpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        home: './src/index.js' //,
        // other: './src/other.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer:{
        //3) 有服务端 不用用代理来处理 能不能再服务端中启动webpack 端口用服务端端口
        
        
        //2） 我们前端只想单纯来模拟数据
        // before(app){ // 提供的方法 钩子
        //   app.get('/user',(req,res)=>{
        //     res.json({name:'珠峰架构-before'})
        //   })
        // }
        //1）
        // proxy:{ // 重写的方式 把请求代理到express服务器上
        //   '/api':{
        //     target:'http://localhost:3000',
        //     pathRewrite:{'/api':''}
        //   }// 配置了一个代理
        // }
   
    },
    plugins:[
        new CleanWebpackPlugin(),
        new CopyWeabpackPlugin([{ // 拷贝插件, 把doc目录拷贝到dist目录下
            from: 'doc', 
            to:'doc'
        }]), 
        new webpack.BannerPlugin("make 2019 By Daya"),
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
        modules: [path.resolve('node_modules'), path.resolve('./src/common')],
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