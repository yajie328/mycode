import Vue from "vue";
import Home from '../components/home.vue';
import List from '../components/list.vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter); // 和以前不一样的地方引入router必须使用use
let routes =  [
    {path: '/home', component: Home},
    {path: '/list', component: List}
]
export default new VueRouter({
    routes
})