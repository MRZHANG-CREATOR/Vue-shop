const {
  userData
} = require('../model/userdata')
module.exports = async ctx => {
  const users = await userData.find({})
  ctx.body =
       {
         data: {
           pagenum: 1,
           total: users.length,
           users: users
         },
         meta: {
           msg: '用户列表获取成功',
           status: 200
         }
       }
}
