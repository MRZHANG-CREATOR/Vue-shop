module.exports = ctx => {
    console.log(ctx.request.body)
    ctx.body =
       {
         data: {
             tem_path: '',
             url: ''
         },
         meta: {
           msg: '用户列表获取成功',
           status: 200
         }
       }
}
