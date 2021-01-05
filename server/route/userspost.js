const {
  userData
} = require('../model/userdata')
const jwt = require('jsonwebtoken')
module.exports = async ctx => {
  console.log(ctx.request.body)
  const userInfo = ctx.request.body
  const token = jwt.sign({
    name: userInfo.username,
    email: userInfo.email
  }, 'shop', { expiresIn: 60 * 60 })
  //   const {username,password,email,mobile}=ctx.request.body
  try {
    userInfo.token = token
    console.log(userInfo)
    await userData.create(userInfo)
    ctx.set('Authorzation', token)
    ctx.body = {
      data: {},
      meta: {
        msg: '用户添加成功',
        status: 201
      }
    }
  } catch (err) {
    console.log(err)
    console.log(Object.keys(err.keyValue))

    ctx.body = {
      data: {},
      meta: {
        msg: Object.keys(err.keyValue) + '重复或异常，' + '用户添加失败',
        status: 400
      }
    }
  }
}
