import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
Vue.use(ElementUI); // inatall vue.componet vue.prototype.xxx

router.beforeEach((to,from,next)=>{  // 全局路由前置守卫
    // 拿出所有匹配的去判断
    if(to.matched.some(n=>n.meta.needLogin)){
        if(localStorage.getItem('login')){
            next();
        }else{
            next('/login');
        }
    }else{
        next();
    }
});
/* router.afterEach(()=>{
    console.log('结束')
}); */

Vue.directive('title', {
    bind: function (el, binding) {
        document.title = binding.value || '';
    }
});
export default new Vue({
    el:'#app',
    render: h=>h(App),
    store,
    router  // this.$route this.$router
})

