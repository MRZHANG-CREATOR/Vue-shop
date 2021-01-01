const mongoose =require('mongoose')
const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true,
        minlength:6,
        maxlength:15
    },
    password:{
        type:String,
        require:true,
    },
    email: {
        type:String,
        require:true,
    },
    rid:{
        type:Number,
        default:0
    },
    token:{
        type:String,
        unique:true,
        required:true
    }
})
const userData=mongoose.model('userdata',userSchema);
async function creatUser(){
await userData.create({
    // @ts-ignore
    username:'123456',
    password:'123456',
    rid:0,
    email:"123456@qq.com",
    token:"1234567890"
})
}
// creatUser()
module.exports={
    userData
}