module.exports = async ctx => {
  console.log(ctx.request.body)
  try {
    ctx.body = {
      data: {},
      meta: {
        msg: '添加成功',
        status: 200
      }
    }
  } catch (err) {
    ctx.body = {
      data: {},
      meta: {
        msg: '添加失败',
        status: 400
      }
    }
  }
}
