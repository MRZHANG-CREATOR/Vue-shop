module.exports = ctx => {
    console.log(ctx.request.body)
    ctx.body =
       {
         data: {
         },
         meta: {
           msg: '添加商品成功',
           status: 200
         }
       }
}