const Conversation = require("../models/conversation");
const User = require("../models/user");
let jwt = require("jsonwebtoken");
let config = require("config");
let secret = config.get("secret");
const Message = require("../models/message");

// get all the conversations
exports.getConversations = async (req, res) => {
  try {
    let conversations = await Conversation.find();
    let messages = await Message.find();
    let sortConversations = conversations
      .map((conv) => messages.filter((msj) => msj.conversationId == conv._id))
      .map((e) => e[e.length - 1])
      .sort((a, b) => {
        return new Date(b.createAt) - new Date(a.createAt);
      }).map(e=>e.conversationId);
const tabb = [];

      for(let i =0; i<sortConversations.length;i++){
        // console.log("tab1",sortConversations[i])
        for(let j =0; j<conversations.length;j++){
          if(sortConversations[i]==conversations[j]._id)
         {
            tabb.push(conversations[j])
        }
      //  console.log("tab2",conversations[j]._id)
      }
      }
    res.send(tabb);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

// create a conversation
exports.creatConversation = async (req, res) => {
  let admin = await User.findOne({ role: "admin" });
  try {
    const newConversation = new Conversation({
      members: [admin._id, req.params.id],
    });
    newConversation.save();
    res.send(newConversation);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};

// get a conversation
exports.getOneConversation = async (req, res) => {
  try {
    let aConversation = await Conversation.findOne({
      members: { $in: [req.params.userId] },
    });
    res.send(aConversation);
  } catch (error) {
    res.status(500).json({ errors: error.message });
  }
};
