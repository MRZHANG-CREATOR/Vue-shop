const {
  userData
} = require('../model/userdata')
const pagination = require('mongoose-sex-page')
module.exports = async ctx => {
  // console.log(ctx.query)
  const queryInfo = JSON.parse(ctx.query.queryInfo)
  // console.log(queryInfo)
  // console.log(queryInfo.query + '')
  // console.log(queryInfo.pagenum)
  // console.log(queryInfo.pagesize)
  // const users = await userData.find({ username: { $regex: queryInfo.query + '' } })
  const users = await pagination(userData).find({ username: { $regex: queryInfo.query + '' } }).page(queryInfo.pagenum).size(queryInfo.pagesize).exec()
  // console.log(users)
  ctx.body =
       {
         data: {
           pagenum: 1,
           total: users.total,
           users: users.records,
           currentsize: users.size
         },
         meta: {
           msg: '用户列表获取成功',
           status: 200
         }
       }
}
