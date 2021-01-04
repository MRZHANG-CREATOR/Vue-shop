const {
  userData
} = require('../model/userdata')

module.exports = async ctx => {
  const { id, state } = ctx.query
  console.log(id)
  console.log(state)
  try {
    await userData.updateOne({ _id: id }, { mg_state: state })
    ctx.body = {
      data: {
      },
      meta: {
        msg: state === 'true' ? '用户开启状态' : '用户冻结状态',
        status: 200
      }
    }
  } catch (err) {
    ctx.body = {
      data: {
      },
      meta: {
        msg: '',
        status: 400
      }
    }
  }
}
