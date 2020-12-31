const Koa=require('koa')
const Router=require('koa-router')
const router=new Router()
router.get('/',ctx=>{
    ctx.body='success'
})
router.post('login',(ctx,next)=>{
    console.log('登录成功')
})
const app=new Koa()
app.use(router.routes())
app.listen(8888,"0.0.0.0",ctx => {
    console.log('服务器成功:http://127.0.0.1:8888')
})