import Login from '@/views/Login.vue'
import Check from "@/views/check/Check";
import CheckInfo from "@/views/check/Info"
import CheckDevice from "@/views/check/Device"
import CheckRule from "@/views/check/Rule"
import CheckEnd from "@/views/check/End"
export default [
    {
      path: '/',
      component: Login
    },
    {
        path: '/check',
        name: 'check',
        component: Check,
        children:[
            {
                path: 'info',
                component: CheckInfo
            },
            {
                path: 'device',
                component: CheckDevice
            },
            {
                path: 'rule',
                component: CheckRule
            },
            {
                path: 'end',
                component: CheckEnd
            }
        ]
        
    },
    {
        path:"/answer",
        name:'answer',
        component:  resolve=>(require(["@/views/answer/Answer.vue"],resolve)),
        children:[
            {
                path:"lookinto", // 问卷调查
                component: resolve=>(require(["@/views/answer/Lookinto.vue"],resolve))
            },
            {
                path:'listen', // 听力测试
                component:resolve=>(require(["@/views/answer/ListenTest.vue"],resolve))
            },
            {
                path:'spoken', // 口语测试
                component:resolve=>(require(["@/views/answer/SpokenTest.vue"],resolve))
            },
            {
                path:'major', // 专业测试
                component:resolve=>(require(["@/views/answer/MajorTest.vue"],resolve))
            }
        ]
    },
    {
        path:'/profile', // 个人中心
        name:'profile',
        component: resolve=>(require(["@/views/profile/Profile.vue"],resolve)),
        children:[
            {
                path: 'info', // 个人信息
                name:'profileInfo',
                component: resolve=>(require(["@/views/profile/Info.vue"],resolve))
            },
            {
                path: 'report', // 报告
                name: 'profileReport',
                component: resolve=>(require(["@/views/profile/Report.vue"],resolve))
            }
        ]

    },
    {
      path: '*',
      redirect: '/'
    }
  ]