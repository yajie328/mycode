({
    appDir: '../src', // 源目录   相对于这个js的路径 
    baseUrl:'./js', // 需要打包的目录 相对于src目录下的路径 即 ./src/js
    dir: '../build', // 输出目录
    mainConfigFile: '../src/js/require.config.js',
    optimizeCss: "standard.keepLines",
    inlineText: false, // 不需要把模板打包
    // name: 'app' // baseUrl下的
    modules:[
        {
            name: 'app',
            excludeShallow: ['jquery']
        }
    ]
})
