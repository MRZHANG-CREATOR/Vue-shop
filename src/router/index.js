import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
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
    component: Home
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
