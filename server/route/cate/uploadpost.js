module.exports = ctx => {
    console.log(ctx.request.body)
    ctx.body =
       {
         data: {
             tem_path: 'tem_path/123',
             url: 'url/123'
         },
         meta: {
           msg: '用户列表获取成功',
           status: 200
         }
       }
}
