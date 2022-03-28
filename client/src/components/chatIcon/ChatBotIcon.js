import React, { useState } from "react";
import "./chatBotIcon.style.css";
import MessageIcon from "@mui/icons-material/Message";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChatHead from "./ChatHead";
import Discussion from "./Discussion";
import Texting from "./Texting";


const ChatBotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  let handelChange = (e) => {
    if (isOpen === true) {
      setIsOpen(false);
    }
    if (isOpen === false) {
      setIsOpen(true);
    }
    let box = document.querySelector(".discussionArea");
    box.scrollTop = box.scrollHeight;
  };

  return (
    <div>
      <section
        className="chatBoxArea"
        style={isOpen ? { display: "block" } : { display: "none" }}
      >
        <ChatHead />
        <Discussion />
        <Texting />
      </section>
      <button className="chatBot" onClick={handelChange}>
        {isOpen ? <KeyboardArrowDownIcon fontSize="large" /> : <MessageIcon />}
      </button>
    </div>
  );
};

export default ChatBotIcon;