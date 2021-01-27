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
router.get('/users', require('./route/user/usersget'))// 用户获取路由
router.put('/users', require('./route/user/usersput'))// 用户状态路由
router.post('/users', require('./route/user/userspost'))// 添加用户路由
router.get('/usershow', require('./route/user/usereditget'))// 用户显示信息路由
router.put('/useredit', require('./route/user/usereditput'))// 用户修改信息路由
router.delete('/userdelete', require('./route/user/userdelete'))// 删除用户
router.get('/rights', require('./route/rightsget'))
router.get('/roles', require('./route/rolesget'))
router.post('/roles', require('./route/rolespost'))// 分配权限路由
router.get('/categories', require('./route/cate/categoriesget'))
router.get('/categories/:id/attributes', require('./route/cate/categoriesidget'))
router.post('/categories', require('./route/cate/categoriespost'))
router.delete('/categories/:id/attributes/:attrid', require('./route/cate/categoriesdelete'))
router.put('/categories/:id/attributes/:attrid', require('./route/cate/categoriesput'))
router.get('/goods', require('./route/cate/goodsget'))
router.delete('/goods/:id', require('./route/cate/goodsdelete'))
router.post('/upload', require('./route/cate/uploadpost'))
router.post('/goods', require('./route/cate/goodspost'))
router.get('/order', require('./route/order/orderget'))
router.get('/kuaidi/:id', require('./route/order/kuaidiget'))
router.get('/report/type/1', require('./route/report/reportget'))
app.use(router.routes())
app.listen(8888, '0.0.0.0', ctx => {
  console.log('服务器成功:http://127.0.0.1:8888')
})
