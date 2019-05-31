import Vue from 'vue';
import VueRouter  from 'vue-router';
import routes from './routes'

Vue.use(VueRouter)// Vue.component(); router-link router-view
export default new VueRouter({
	// mode: 'hash',
	mode: 'history',
	routes
})
