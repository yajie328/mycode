let path =  require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    mode: "development",
    entry: './src/main.js',
    output:{
        filename: 'bundle.js',
        path: path.resolve('./dist')
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use:['vue-style-loader','css-loader']
            },
            {
                test: /\.less$/,
                use:['vue-style-loader','css-loader'] // 用了vue-style-loader就不能用后面的loader了，否则报错,'postcss-loader', 'less-loader'
            },
            {
                test: /\.[jpg|jpeg|png|gif]$/i,
                loader: 'url-loader?limit=1024'
            }
           
        ]
    },
    plugins:[
        new VueLoaderPlugin(), // vue-loader比较特殊  一定不能丢了这个vueloaderplugin
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            title:"vue首页",
            hash: true

        }),
        
    ]
}