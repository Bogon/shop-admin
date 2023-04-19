import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from "@/components/Welcome"
import Users from '@/components/user/Users'
import Rights from '@/components/power/Rights'
import Roles from '@/components/power/Roles'
import Categories from "@/components/goods/Categories"
import Params from "@/components/goods/Params"
import Goods from "@/components/goods/Goods"
import Add from "@/components/goods/Add"
import Edit from "@/components/goods/Edit";

import '@/assets/css/global.css'

Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/login'},
  {path: '/login', component: Login},
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome,
      },
      {
        path: '/users',
        component: Users,
      },
      {
        path: '/rights',
        component: Rights,
      },
      {
        path: '/roles',
        component: Roles,
      },
      {
        path:'/categories',
        component: Categories,
      },
      {
        path: '/params',
        component: Params
      },
      {
        path: '/goods',
        component: Goods,
      },
      {
        path:'/goods/add',
        component: Add,
      },
      {
        path:'/goods/edit/:goodsId',
        component: Edit,
        name: 'Edit'
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  // 获取 token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login');
  next()

})

export default router
