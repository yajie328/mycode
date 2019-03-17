let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'production', //production development
    entry: {
        home: './src/index.js' //,
        // other: './src/other.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    // 我试了这3个都产生了map文件，而且生产环境没有达到映射的目的？？？？
    //devtool: 'source-map', // 会产生map文件，dev下能定位到原位置， build后定位不到原位置，视频上可以定位的原文件位置的
     devtool: 'evel-source-map' ,// 不会产生map 文件, 但是我的产生了
    // devtool: 'cheap-module-source-map', 
    plugins:[
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
    module:{
        rules: [
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