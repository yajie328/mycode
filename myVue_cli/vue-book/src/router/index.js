import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import List from '../components/List.vue'
import Collect from '../components/Collect.vue'
import Add from '../components/Add.vue'
import Detail from '../components/Detail.vue'

Vue.use(Router)
let routes = [
  {path:'/', redirect: '/home'},
  {path: '/home', component: Home},
  {path: '/collect', component: Collect},
  {path: '/list', component: List},
  {path: '/add', component: Add},
  {path: '/detail/:did', component: Detail, name:"detail"}
]

export default new Router({
  routes
})
