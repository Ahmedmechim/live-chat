let mongoose=require('mongoose')
let Schema=mongoose.Schema
let userSchema=new Schema({
    userName: String,
    email: String,
    password: String,
    role:String
})
module.exports=mongoose.model("User",userSchema)