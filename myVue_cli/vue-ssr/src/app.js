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