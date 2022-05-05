let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let messageSchema = new Schema({
  conversationId: String,
  senderId: String,
  text: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Message", messageSchema);
