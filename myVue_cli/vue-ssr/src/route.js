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