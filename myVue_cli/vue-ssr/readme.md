## 搭建自己的vue-ssr
## 1.需要安装的包
-  "@babel/core": "^7.3.4",
-  "@babel/plugin-syntax-dynamic-import": "^7.2.0",
-  "@babel/preset-env": "^7.3.4",
-  "babel-loader": "^8.0.5",
-  "css-loader": "^2.1.1",
-  "express": "^4.16.4",
-  "html-webpack-plugin": "^3.2.0",
-  "vue": "^2.6.8",
-  "vue-loader": "^15.7.0",
-  "vue-meta": "^1.5.8",
-  "vue-router": "^3.0.2",
-  "vue-server-renderer": "^2.6.8",
-  "vue-style-loader": "^4.1.2",
-  "vue-template-compiler": "^2.6.8",
-  "vuex": "^3.1.0",
-  "webpack": "^4.29.6",
-  "webpack-cli": "^3.2.3",
-  "webpack-dev-server": "^3.2.1",
-  "webpack-merge": "^4.2.1",
-  "webpack-node-externals": "^1.7.2"

## 2.手动配置webpack.config.js
```javascript
let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
let VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
	entry: path.resolve(__dirname, 'src/app.js'),
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules:[
			{
				test:/\.js$/,
				use:{
					loader:'babel-loader',
					options:{
						presets:['@babel/preset-env']
					}
				},
				exclude: /node_modules/
			},
			{
				test:/\.css$/,
				use:['vue-style-loader', 'css-loader']
			},
			{
				test:/\.vue$/,
				use:'vue-loader'
			}
		]
	},
	plugins:[
		new VueLoaderPlugin(),
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, 'public/index.html')
		})
	]
}
```
目录结构：
- root>src>componets>Bar.vue、Foo.vue
- src> app.js、App.vue
- root>public>index.html
- root>package.json、server.js、webpackage.config.js
然后
- 执行 npx webpack-dev-server
- 可以看到正确渲染了页面
添加配置脚本用npm执行  npm run client:dev
``` json
script:{
	"client:dev": "webpack-dev-server"
}
```
## 3 进行webpack.configure.js的拆分 需要区分哪些是不同的，拆分出去， 文件如下
- webpack.base.js
- webpack.client.js
- webpack.server.js
分析： 把不同的拿出去
1. 入口文件不一样，
2. 输出的文件名称不能一样，使用了[name].bundle.js
3. 输出的html文件名称不能一样，末班也不一样，所以在public下新建index.ssr.html 文件
4. 用户每次访问都应该生成一个新的vue实例，所以服务端在每次需要调用一个生成vue实例的函数, 即新建src下面的app.js,
服务端打包入口文件需要调用这个app.js
src/app.js
```javascript
import Vue from 'vue';
import App from './App.vue';

// 为了兼容服务端 每个用户调用应该产生一个新的实例 要把这个改造成函数
// 而且服务端不需要挂载 
function createApp(){ // 创建新的实例
	let app = new Vue({
		render: h=>h(App)
	})
	return {app};
}

export default createApp;
```
> 客户端入口文件 /src/client-entry.js  
```javascript
import createApp from './app';

let {app} = createApp();
app.$mount('#app');

```
> 服务端入口文件 、src/server-client.js
> 调用写好的app.js,创建vue实例并挂载到app上
```javascript
import createApp from './app';

// 服务的每次函数产生一个新的实例
export default()=>{
	return createApp();
}
```
webpack.base.js
```javascript
let path = require('path');
let VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, '../dist')
	},
	module: {
		rules:[
			{
				test:/\.js$/,
				use:{
					loader:'babel-loader',
					options:{
						presets:['@babel/preset-env']
					}
				},
				exclude: /node_modules/
			},
			{
				test:/\.css$/,
				use:['vue-style-loader', 'css-loader']
			},
			{
				test:/\.vue$/,
				use:'vue-loader'
			}
		]
	},
	plugins:[
		new VueLoaderPlugin()
		
	]
}
```
webpack.client.js
```javascript
let merge = require('webpack-merge');
let base = require('./webpack.base');
let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(base,{
	entry: {
		client: path.resolve(__dirname, '../src/client-entry.js')
	},
	plugins:[
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../public/index.html')
		})
	]
})
```
webpack.server.js
```javascript
let merge = require('webpack-merge');
let base = require('./webpack.base');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(base,{
	target:'node', // 打包出来的结果给node用 
	entry: { // 入口文件
		server: path.resolve(__dirname, '../src/server-entry.js')
	},
	output: {
		libraryTarget: 'commonjs2'  //node方式导出 module.exports = server.entry.js
	},
	plugins:[
		new HtmlWebpackPlugin({
			filename: 'index.ssr.html',
			template: path.resolve(__dirname, '../public/index.ssr.html'),
			excludeChunks:['server']
		})
	]
})
```
配置改了，重新配置npm执行脚本如下：
```json
"script":{
	"client:dev": "webpack-dev-server --config ./config/webpack.client.js",
	"client:build": "webpack --config ./config/webpack.client.js",
	"server:build": "webpack --config ./config/webpack.server.js"
}
 
```
执行npm：client:dev 和之前效果一样
执行npm run server:build 在dist目录下产生了2个打包出来的文件，server.bundle.js index.ssr.html
### 4. 创建node服务服务， 通过node服务来渲染打包出来的ssr文件进行渲染返回
/root/node-server.js
```javascript
let express = require('express');
let app = express();
let Vue = require('vue');
let fs = require('fs');
// vue提供的服务端渲染的包
let VueServerRenderer  = require('vue-server-renderer');
const { createBundleRenderer } = require('vue-server-renderer')

let serverBundle = fs.readFileSync('./dist/server.bundle.js','utf8');
let template = fs.readFileSync('./dist/index.ssr.html','utf8')

let renderer = createBundleRenderer(serverBundle,{
	template
}); 
app.get('/', (req,res)=>{
	// 把渲染的字符串扔给客户端并  只是返回字符串，没有vue的实际功能
	renderer.renderToString((err, html)=>{
		res.send(html)
	})
})
app.use(express.static(path.resolve(__dirname,'dist')));
app.listen(4000);
```
执行 这个server文件 node node-server.js
然后访问localhost:4000 可以看到和我们一样的页面
不过这个页面的vue功能没有
因为我们的vue实例是挂载到dom元素#app上的，而这个内容只是node返回的字符串
我们需要把打包出来的client.bundle.js 引入到index.ssr.html文件中
引入后发现还是不可以实现vue功能， 这个还需要在app.vue的外出div上添加 id="#app"

然后发现一切正常

然后加入路由,加入vuex
scr/route.js
```javascript
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta  from 'vue-meta';
import Bar from './components/Bar.vue';
import Foo from './components/Foo.vue'

Vue.use(VueRouter);
Vue.use(VueMeta);  //   this.$meta

export default ()=>{
   let router =  new VueRouter({
		mode:'history',
		routes:[
			{
				path:'/',
				component: Bar
			},{
				path: '/foo',
				// component: ()=>(import('./components/Foo.vue'))
				component: Foo
			}
		]
	})

	return router;
}
// 每次都产生一个独立的路由
```
src/srote.js
```javascript
import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex);
export default ()=>{
	let store = new Vuex.Store({
		state:{
			username:'jw'
		},
		mutations:{
			set_username(state){
				state.username = 'zfpx';
			}
		},
		actions:{
			set_username({commit}){
				return new Promise((resolve,reject)=>{
					setTimeout(() => {
						commit('set_username');
						resolve();
					}, 1000);
				})
			}
		}
	});
	return store;
}

```
app.js 需要引入路由和store，并把路由、store把返回出去
```javascript
import Vue from 'vue';
import App from './App.vue';
import createRouter  from './route'
import createStore from './store'
import './libs/eventBus'


// 为了兼容服务端 每个用户调用应该产生一个新的实例 要把这个改造成函数
// 而且服务端不需要挂载 
function createApp(){ // 创建新的实例
	let router = createRouter();
	let store = createStore();
	let app = new Vue({
		router,
		store,
		render: h=>h(App)
	})
	return {app, router,store};
}

export default createApp;
```
服务端打包的入口文件也加一下路由, 有些路由是动态加载的，所以我们需要处理一下，返回一个promise
router.onReady() 保证路由组件都加载完成
并且把vuex中的状态挂载在上下文state上
src/server-entry.js
```javascript
import createApp from './app';

// 服务的每次函数产生一个新的实例
export default(context)=>{
	
	return new Promise((resolve, reject)=>{
		let {app, router, store} =  createApp();
		router.push(context.url);
		// 为了防止路由中的异步逻辑 所以采用promise形式 等待路由加载完成后 返回vue实例 服务端才可以渲染除出完整的页面
		// 需要把当前页面中匹配到的组件 找到他的asyncData方法让他执行

		router.onReady(()=>{
			// 获取当前路径匹配到的组件  看一下这个组件中 有没有 asyncData方法
			let matchesComponents = router.getMatchedComponents();
			Promise.all(matchesComponents.map(component=>{
				if(component.asyncData){
					return component.asyncData({store});
				}
			})).then(()=>{
				// 把vuex中的状态 挂载在 上下文中的state上
				context.state = store.state;
				context.meta = app.$meta(); // 不能解构
				// 会自动在window上挂载一个属性__INITIAL_STATE__
				resolve(app);
			}).catch(err=>{
				console.log(err);
			})
		});
	})
	
}
```
node 服务文件改一下，里面的2个json文件可以避免每次打包都重启node服务器，

```javascript
let path = require('path');
let express = require('express');
let app = express();
let Vue = require('vue');
let fs = require('fs');
// vue提供的服务端渲染的包
const VueServerRenderer = require('vue-server-renderer')

// let serverBundle = fs.readFileSync('./dist/server.bundle.js','utf8');
let serverBundle = require('./dist/vue-ssr-server-bundle.json');
let clientManifest = require('./dist/vue-ssr-client-manifest.json');
let template = fs.readFileSync('./dist/index.ssr.html','utf8')

let renderer = VueServerRenderer.createBundleRenderer(serverBundle,{
	template,
	clientManifest // 重新打包客户端和服务端node就不需要重启了
}); 

app.get('/', (req,res)=>{
	// 把渲染的字符串扔给客户端并  只是返回字符串，没有vue的实际功能
	
	let context = {url: req.url};
	renderer.renderToString(context, (err, html)=>{
		res.send(html);
	})

})
// 顺序不能乱
app.use(express.static(path.resolve(__dirname,'dist')));

// 如果访问的路径不存在 默认渲染index.ssr.html, 并把路由定向到当前请求的路径
app.get('*',(req,res)=>{
	// 把渲染成功的字符串扔给客户端,只是返回一个字符串 并没有vue实际功能
	let context = {url:req.url};
	renderer.renderToString(context,(err,html)=>{
		res.send(html);
	});
});
app.listen(4000);

```

public/index.ssr.html中的script引入， 因为上面的json文件已经帮我们自动引入进去了


然后重新打包客户端和服务端，运行node服务器， 即完成了我们的vue服务端渲染





