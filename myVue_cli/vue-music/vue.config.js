const path = require('path')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'? '/onlinepath/' : '/',
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.mode = 'production'
          } else {
            config.mode = 'development'
          }
          Object.assign(config, {
            // 开发生产共同配置
            resolve: {
              extensions: ['.js', '.vue', '.json'],
              alias: {
                'common': path.resolve(__dirname, './src/common'),
                'components': path.resolve(__dirname, './src/components'),
                'pages': path.resolve(__dirname, './src/pages')
              } // 别名配置
            }
          })
    }
}
  
