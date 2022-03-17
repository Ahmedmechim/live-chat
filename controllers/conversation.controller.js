const Conversation = require("../models/conversation");
const User = require("../models/user");
let jwt = require("jsonwebtoken");
let config = require("config");
let secret = config.get("secret");

// get all the conversations
exports.getConversations = async (req, res) => {
  try {
    let conversations = await Conversation.find();
    res.send(conversations);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

// create a conversation
exports.creatConversation = async (req, res) => {
  let admin = await User.findOne({ role: "admin" });
  try {
    const newConversation = new Conversation({
      members: [admin._id,req.params.id],
    });
    newConversation.save();
    res.send(newConversation)
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

// get a conversation
exports.getOneConversation = async (req,res)=>{
  try {
    let aConversation = await Conversation.findOne({members: { $in: [req.params.userId] },});
    res.send(aConversation);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
}
