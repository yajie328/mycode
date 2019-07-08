let merge = require('webpack-merge');
let base = require('./webpack.base');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
let externals = require('webpack-node-externals'); 
module.exports = merge(base,{
    target:'node', // 打包出来的结果给node用 
    entry: { // 入口文件
        server: path.resolve(__dirname, '../src/server-entry.js')
    },
    output: {
        libraryTarget: 'commonjs2'  //node方式导出 module.exports = server.entry.js
    },
    externals: [externals()], // 第三方模块不需要打包 因为js实在node中运行的
    plugins:[
        new VueSSRServerPlugin(), // vue自带的插件 解决每次改变服务端重启的问题， 产生2个json文件
        new HtmlWebpackPlugin({
            filename: 'index.ssr.html',
            template: path.resolve(__dirname, '../public/index.ssr.html'),
            excludeChunks:['server']
        })
    ]
})