import React, { useEffect, useRef, useState } from "react";
import "./Texting.style.css";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { createConversation, sendMessage } from "../../redux/action";
import { useParams } from 'react-router';
import { io } from "socket.io-client";



const Texting = () => {
  const { user, conversation, messages,allConversations } = useSelector((state) => state);

  const dispatch = useDispatch();
  let params = useParams();

  let  receiverId = null
  if(conversation){
    receiverId=conversation.members.find(
      (member) => member !== user._id)  
  }else{
   
    receiverId=allConversations.find((conversation)=>conversation._id===params.id).members.find(
      (member) => member !== user._id) 
  }
  
    console.log(receiverId)

  const [text, setText] = useState("");

  const socket= useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    }, []);

  const handelSend = (e) => {
    if (messages){
      e.preventDefault();
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: text,
      });
      dispatch(sendMessage(params.id||conversation._id, { text }));
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
      <div className="icons">
        <EmojiEmotionsIcon />
        <SendIcon  style={text.length===0?{color:"rgb(203, 209, 214)"}:{color:"rgb(0, 204, 255)"}} onClick={handelSend}  />
      </div>
    </div>
  );
};

export default Texting;
