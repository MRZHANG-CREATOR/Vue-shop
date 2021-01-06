const {
  userData
} = require('../model/userdata')
module.exports = async ctx => {
  const { id } = ctx.query
  // console.log(id)
  try {
    const user = await userData.findById(id)
    // console.log(user)
    ctx.body = {
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        mobile: user.mobile
      },
      meta: {
        msg: '用户信息获取成功',
        status: 200
      }
    }
  } catch (err) {
    ctx.body = {
      data: {
      },
      meta: {
        msg: '用户信息获取失败',
        status: 400
      }
    }
  }
}
