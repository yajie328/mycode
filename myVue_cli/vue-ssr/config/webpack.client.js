let merge = require('webpack-merge');
let base = require('./webpack.base');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
module.exports = merge(base,{
    entry: {
        client: path.resolve(__dirname, '../src/client-entry.js')
    },
    plugins:[
        new VueSSRClientPlugin(), // vue自带的插件 解决每次改变服务端重启的问题
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html')
        })
    ]
})