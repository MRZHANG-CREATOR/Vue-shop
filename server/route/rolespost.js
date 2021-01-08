module.exports = async ctx => {
  const { id } = ctx.query
  const idStr = ctx.request.body
  console.log(id)
  console.log(idStr)
  ctx.body =
    {
      data: {
      },
      meta: {
        msg: 'roles获取失败',
        status: 400
      }
    }
}
