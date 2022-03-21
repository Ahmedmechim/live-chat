import React, { useState } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import {  createConversation, sendMessage } from "../redux/action";

const Texting = () => {
  const { user, conversation, messages } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const handelSend = (e) => {
    if (messages){
      
      e.preventDefault();
      dispatch(sendMessage(conversation._id, { text }));
      setText("");
    }else{
      e.preventDefault();
      dispatch(createConversation(user._id, { text }));
      setText("");
    }
  };
  return (
    <div className="texting">
      <textarea
        className="textMessage"
        placeholder="write a message"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></textarea>
      {/* <button onClick={handelSend}>--</button> */}
      <div className="icons">
        <EmojiEmotionsIcon />
        <SendIcon  style={text.length===0?{color:"rgb(203, 209, 214)"}:{color:"rgb(0, 204, 255)"}} onClick={handelSend}  />
      </div>
    </div>
  );
};

export default Texting;
