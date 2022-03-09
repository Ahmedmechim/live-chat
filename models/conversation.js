let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let conversationSchema = new Schema({
  members: Array,
});
module.exports = mongoose.model("Conversation", conversationSchema);
