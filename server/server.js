const Koa = require('koa')
const Router = require('koa-router')
const router = new Router()
const Koabody = require('koa-body')
const KoaBodyParser = require('koa-bodyparser')
require('./model/connect')
require('./model/userdata')
const app = new Koa()
app.use(Koabody())
app.use(KoaBodyParser())
router.get('/', ctx => {
  ctx.body = 'success'
})
router.post('/login', require('./route/loginpost'))// 登录路由
router.get('/menus', require('./route/menusget'))// 侧边栏列表路由
router.get('/users', require('./route/usersget'))// 用户获取路由
router.put('/users', require('./route/usersput'))// 用户状态路由
router.post('/users', require('./route/userspost'))// 添加用户路由
router.get('/useredit', require('./route/usereditget'))// 用户修改信息路由
app.use(router.routes())
app.listen(8888, '0.0.0.0', ctx => {
  console.log('服务器成功:http://127.0.0.1:8888')
})
