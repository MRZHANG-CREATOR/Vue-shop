const Koa = require('koa')
const Router = require('koa-router')
const router = new Router()
const Koabody = require('koa-body')
require('./model/connect')
require('./model/userdata')
const app = new Koa()
app.use(Koabody())
router.get('/', ctx => {
  ctx.body = 'success'
})
router.post('/login', require('./route/loginpost'))
router.get('/menus', require('./route/menusget'))
router.get('/users', require('./route/usersget'))
router.put('/users', require('./route/usersput'))
app.use(router.routes())
app.listen(8888, '0.0.0.0', ctx => {
  console.log('服务器成功:http://127.0.0.1:8888')
})
