import React from "react";
import "./Message.style.css";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Message = ({ msg }) => {
  const { user, pic, allConversations, users } = useSelector((state) => state);
  let params = useParams();
  let x = ""
  let recived=""
  if(user.role==="admin"){
    x=allConversations
    .find((conversation) => conversation._id === params.id)
    .members.find((member) => member !== user._id);
    recived=users
    .find((user) => user._id === x)
    .email.charAt(0)
    .toUpperCase()
  }

  return (
    <div className={user._id === msg.senderId ? "msgSender" : "msgReciver"}>
      {user.role === "admin" ? (
        <Avatar style={user._id === msg.senderId?{display:"none"}:{margin:"0 5px 0 5px"}}>{recived}</Avatar>
      ) : (
        <img
          className={user._id === msg.senderId ? "picSender" : "picReciver"}
          src={pic}
          alt=""
        />
      )}

      <p className={user._id === msg.senderId ? "textSender" : "textReciver"}>
        {msg.text}
      </p>
    </div>
  );
};

export default Message;
