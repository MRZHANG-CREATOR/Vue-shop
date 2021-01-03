const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 15
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  rid: {
    type: Number,
    default: 0
  },
  token: {
    type: String,
    unique: true,
    required: true
  },
  mobile: {
    type: Number,
    minlength: 7,
    maxlength: 11
  },
  role_name: {
    type: String,
    default: '普通管理员'
  },
  mg_state: {
    type: Boolean,
    default: true
  },
  creat_time: {
    type: Date,
    default: Date.now
  }
})
const userData = mongoose.model('userdata', userSchema)
async function creatUser() {
  await userData.create({
    // @ts-ignore
    username: '123456',
    password: '123456',
    mobile: '12345678',
    rid: 0,
    email: '123456@qq.com',
    token: '1234567890'
  })
}
// creatUser()
module.exports = {
  userData
}
