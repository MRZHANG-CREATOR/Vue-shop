import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: "login-home-welcome" */ '../components/Login.vue')
const Home = () => import(/* webpackChunkName: "login-home-welcome" */ '../components/Home.vue')
const Welcome = () => import(/* webpackChunkName: "login-home-welcome" */ '../components/Welcome.vue')
// import Login from '../components/Login.vue'
// import Home from '../components/Home.vue'
// import Welcome from '../components/Welcome.vue'
const Users = () => import(/* webpackChunkName: "users-right-roles" */ '../components/Users.vue')
const Right = () => import(/* webpackChunkName: "users-right-roles" */ '../components/power/Rights.vue')
const Roles = () => import(/* webpackChunkName: "users-right-roles" */ '../components/power/Roles.vue')
// import Users from '../components/Users.vue'
// import Right from '../components/power/Rights.vue'
// import Roles from '../components/power/Roles.vue'
const Cate = () => import(/* webpackChunkName: "login-home-welcome" */ '../components/goods/Cate.vue')
const Params = () => import(/* webpackChunkName: "login-home-welcome" */ '../components/goods/Params.vue')
// import Cate from '../components/goods/Cate.vue'
// import Params from '../components/goods/Params.vue'
const GoodList = () => import(/* webpackChunkName: "login-home-welcome" */ '../components/goods/List.vue')
const Add = () => import(/* webpackChunkName: "login-home-welcome" */ '../components/goods/Add.vue')
// import GoodList from '../components/goods/List.vue'
// import Add from '../components/goods/Add.vue'
const Order = () => import(/* webpackChunkName: "login-home-welcome" */ '../components/order/Order.vue')
const Report = () => import(/* webpackChunkName: "login-home-welcome" */ '../components/report/Report.vue')
// import Order from '../components/order/Order.vue'
// import Report from '../components/report/Report.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Right },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Cate },
      { path: '/params', component: Params },
      { path: '/cartlist', component: GoodList },
      { path: '/cartlist/add', component: Add },
      { path: '/order', component: Order },
      { path: '/report', component: Report }
    ]
  }
]
// component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // 挂载路由守卫
  // to 目标路径  from 从哪个路径跳转而来  next()放行  next('路径')强制跳转
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
