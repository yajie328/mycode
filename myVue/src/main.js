import Vue from "vue";     //实际调用的时vue.common.js 可以少6K  runtime 不支持templte 只支持render
import App from './App.vue';
import router  from './router';

import Notify from './plugin/notify';
Vue.use(Notify, {delay:3000})
new Vue({
    router,
    el: '#app',
    render:(h)=> h(App)
})