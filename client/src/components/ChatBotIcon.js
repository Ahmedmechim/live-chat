import React, { useState } from "react";
import MessageIcon from "@mui/icons-material/Message";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Discussion from "./Discussion";

const ChatBotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  let handelChange = (e) => {
    if (isOpen === true) {
      setIsOpen(false);
    }
    if (isOpen === false) {
      setIsOpen(true);
    }
  };
  return (
    <div>
      <section
        className="chatBoxArea"
        style={isOpen ? { display: "block" } : { display: "none" }}
      >
        <div className="header"></div>
        <div className="discussionArea">
        <Discussion />
        </div>
        <div className="texting">
          <textarea
            className="textMessage"
            placeholder="write a message"
          ></textarea>
          <div className="icons">
            <GifIcon fontSize="large" />
            <EmojiEmotionsIcon />
            <AttachFileIcon className="jointFile" />
          </div>
        </div>
      </section>
      <button className="chatBot" onClick={handelChange}>
        {isOpen ? <KeyboardArrowDownIcon fontSize="large" /> : <MessageIcon />}
      </button>
    </div>
  );
};

export default ChatBotIcon;
