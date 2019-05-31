requirejs.config({
    baseUrl: '../../static/src/js',
    paths: {
        'jquery': "./lib/jquery",
        "text": "./lib/text",
        "util": "./lib/util/util",
        "css": "./css",
        'i18n': "./lib/i18n/i18n"
    },
    config: {
        text: {
            // onXhr :function(xhr, url){
            //     console.log('before');
            //     xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            // },
            // createXhr: function(){
            //     console.log('ing')
            // },
            // onXhrComplete: function(xhr,url){
            //     console.log('completed');
            // }
        },
        i18n: {
            locale: 'en'
        }
    },
    shim:{ // 不符合amd规范的
        "info" : {
            deps: ['jquery'], // 依赖的模块
            exports: 'info', // 暴漏的全局变量
            init: function($){ // 初始化函数， 返回对象代替exports作为模块对象
                // return $
            }
        },
         'util': ['css!./lib/util/css/common.css', 'css!./lib/util/css/color.css']  //util依赖2个css文件的情况下
    },
    map: {
        // "*" : {
        //     'css': './lib/require-css/css'
        // },
        // "*": {
        //         "jquery": "./lib/jquery",
        //     },
        // "myjson":{
        //     "jquery": "./jquery", // 指定文件加载的jquery是jeury2.js
        // }
    }
    
})