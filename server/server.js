const Koa=require('koa')
const Router=require('koa-router')
const router=new Router()
const Koabody=require('koa-body')
require('./model/connect')
require('./model/userdata')
const app = new Koa()
app.use(Koabody())
const baseURL ='/api/private/v1/'
router.get('/',ctx=>{
    ctx.body='success'
})
router.post('/login',require('./route/loginpost'))
app.use(router.routes())
app.listen(8888,"0.0.0.0",ctx => {
    console.log('服务器成功:http://127.0.0.1:8888')
})