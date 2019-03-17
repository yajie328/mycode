let {smart} = require('webpack-merge');
let base = require('./webpack.config.base');

module.exports = smart(base,{
    mode: "production",
    // watch: true,
    watchOptions:{
        poll: 1000,
        aggregateTimeout:500,
        ignored: /node_modules/
    },

})