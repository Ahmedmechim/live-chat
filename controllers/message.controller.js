const Message = require("../models/message")
const User = require("../models/user")
let config = require("config");
let secret = config.get("secret");
let jwt = require("jsonwebtoken");



// get messages
exports.getMessages=async(req,res)=>{
    try {
      let messages= await Message.find({ conversationId: req.params.conversationId })
      res.send(messages)
      } catch (error) {
         console.log(error.message)
      }
  }

// send a message
exports.sendMessage=async(req,res)=>{
    let token = req.headers.authorization;
    let decoded = jwt.verify(token, secret);
    let user = await User.findById(decoded.id);
    let senderId=user.id
    let conversationId=req.params.conversationId
    try {
        let newMessage = new Message({
            conversationId,
            senderId,
            ...req.body,
            });
    newMessage.save();
    res.send(newMessage);
    } catch (error) {
        console.log(error.message)
    }
}