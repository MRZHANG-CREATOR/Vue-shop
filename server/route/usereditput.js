const {
  userData
} = require('../model/userdata')
module.exports = async ctx => {
  const { id } = ctx.query
  const { email, mobile } = ctx.request.body
  try {
    await userData.updateOne({ _id: id }, {
      email: email,
      mobile: mobile
    })
    ctx.body = {
      data: {
      },
      meta: {
        msg: '用户信息更新成功',
        status: 200
      }
    }
  } catch (err) {
    ctx.body = {
      data: {
      },
      meta: {
        msg: '用户信息更新失败',
        status: 400
      }
    }
  }
}
