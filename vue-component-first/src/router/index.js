import {createRouter,createWebHistory} from 'vue-router'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'       
import User from '../pages/User.vue'

const routes = [
    {   
        path:'/login',
        name:'Login',
        component: Login
    },
    {
        path:'/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }, // 需要认证的路由
        children:[
            {
                path:'', // 默认子路由
                redirect:'/dashboard/users', // 默认重定向到用户管理页面
                meta: { requiresAuth: true}
            },
            {
                path:'users',
                name:'Users',
                component: User,
                meta: { requiresAuth: true}
            }
        ]
    },
    {
        path:'/',
        redirect:'/dashboard'
    },
]

    const router = createRouter({
        history: createWebHistory(),
        routes
    })

    // 导航前置守卫，检查路由是否需要认证
    router.beforeEach((to, from, next) => {
        const token = localStorage.getItem('token'); // 从本地存储获取token
        if(to.matched.some(record => record.meta.requiresAuth) && !token){
            // 路由没有认证，token为假,跳转登录页面
            next('/login') 
        }else{
            next() // 继续导航
        }
    })

export default router