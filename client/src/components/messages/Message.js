import React from "react";
import "./Message.style.css";

import { useSelector } from "react-redux";

const Message = ({ msg }) => {
  const { user,pic } = useSelector((state) => state);

  return (
    <div className={user._id === msg.senderId ? "msgSender" : "msgReciver"}>
      <img className={user._id === msg.senderId ? "picSender" : "picReciver"}
        src={pic}
        alt=""
      />
      <p className={user._id === msg.senderId ? "textSender" : "textReciver"}>
        {msg.text}
      </p>
    </div>
  );
};

export default Message;
