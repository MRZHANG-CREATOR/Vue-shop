const {
  userData
} = require('../../model/userdata')
module.exports = async ctx => {
  const { id } = ctx.query
  //   console.log(id)
  try {
    await userData.findByIdAndDelete(id)
    ctx.body = {
      data: {
      },
      meta: {
        msg: '用户删除成功',
        status: 200
      }
    }
  } catch (err) {
    console.log(err)
    ctx.body = {
      data: {
      },
      meta: {
        msg: '用户删除失败',
        status: 400
      }
    }
  }
}
