import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () =>import(/* webpackChunkName: "login-home-welcome" */ '@/components/Login')
const Home = () =>import(/* webpackChunkName: "login-home-welcome" */ '@/components/Home')
const Welcome = () =>import(/* webpackChunkName: "login-home-welcome" */ '@/components/Welcome')

const Users = () =>import(/* webpackChunkName: "user" */ '@/components/user/Users')

const Rights = () =>import(/* webpackChunkName: "power" */ '@/components/power/Rights')
const Roles = () =>import(/* webpackChunkName: "power" */ '@/components/power/Roles')



const Categories = () =>import(/* webpackChunkName: "goods" */ '@/components/goods/Categories')
const Params = () =>import(/* webpackChunkName: "goods" */ '@/components/goods/Params')
const Goods = () =>import(/* webpackChunkName: "goods" */ '@/components/goods/Goods')
const Add = () =>import(/* webpackChunkName: "goods" */ '@/components/goods/Add')
const Edit = () =>import(/* webpackChunkName: "goods" */ '@/components/goods/Edit')

// import Login from '@/components/Login'
// import Home from '@/components/Home'
// import Welcome from "@/components/Welcome"
// import Users from '@/components/user/Users'
// import Rights from '@/components/power/Rights'
// import Roles from '@/components/power/Roles'
// import Categories from "@/components/goods/Categories"
// import Params from "@/components/goods/Params"
// import Goods from "@/components/goods/Goods"
// import Add from "@/components/goods/Add"
// import Edit from "@/components/goods/Edit";
// import Order from "@/components/order/Order";
// import Report from "@/components/report/Report";

const Order = () =>import(/* webpackChunkName: "order" */ '@/components/order/Order')


const Report = () =>import(/* webpackChunkName: "report" */ '@/components/report/Report')



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
      {
        path:'/orders',
        component: Order,
      },
      {
        path:'/reports',
        component: Report,
      },
    ]
  }
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  // 获取 token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login');
  next()

})

export default router
