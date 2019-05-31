import Home from '../views/Home'
import User from '../views/User'
import Profile from '../views/Profile'
// import UserAdd from '../views/UserAdd'
// import UserList from '../views/UserList'
import UseTree  from '../views/UseTree'
export default [
	{
		path:'/',
		component:Home,
		name:'home',
		meta:{
            keepAlive:true
        }
	},{
		path:'/user',
		component: User,
		children:[
			{
				path:"",
				component:()=>import('../views/UserInit.vue')
			},
			{
				path:'add',
				name: 'adduser',
				component: ()=>import('../views/UserAdd.vue'),
				meta:{
					needLogin: true,
					title: "添加用户"
				},
			},
			{
				path:'list',
				name: 'userlist',
				component:()=>import('../views/UserList'),
			},
			{
				path:'detail/:id',
				name: 'userdetail',
				component:()=>import('../views/UserDetail.vue'),
				alias: 'd/:id'
			}
		]
	},
	{
		path:'/profile',
		component: Profile,
		name:'profile',
		meta:{
			title: '个人中心'
		}
	},
	{
		path:'/login',
		component: ()=>import('../views/Login.vue')
	},
	{
		path: '/tree',
		component: UseTree
	},
	{
		path:'*',
		components:{
			default:()=> import("../views/Err.vue"),
			logo:()=>import('../views/Logo.vue')
		}
	}
]
