const {
  userData
} = require('../model/userdata')

module.exports = async ctx => {
  console.log('跨域成功')
  console.log(ctx.request.body)
  const {
    username,
    password
  } = ctx.request.body
  const user = await userData.findOne({
    username: username
  })
  console.log(user)
  if (user && user.password == password) {
    ctx.body = {
      data: user,
      meta: {
        status: 200,
        msg: '登录成功'
      }
    }
  } else {
    ctx.body = {
      data: {},
      meta: {
        status: 400,
        msg: '登录失败'
      }
    }
  }
}
