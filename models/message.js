let mongoose=require('mongoose')
let Schema=mongoose.Schema
let messageSchema=new Schema({
  conversationId: String,
  senderId: String,
  text: String,
})
module.exports=mongoose.model("Message",messageSchema)