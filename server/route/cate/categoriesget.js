module.exports = async ctx => {
  ctx.body =
    {
      data: {
        pagenum: 0,
        pagesize: 5,
        result: [{
          name: '大家电'
        }],
        total: 100
      },
      meta: {
        msg: 'roles获取失败',
        status: 400
      }
    }
}
