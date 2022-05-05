import React, { useEffect, useState } from "react";
import "./chatBotIcon.style.css";
import MessageIcon from "@mui/icons-material/Message";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChatHead from "./ChatHead";
import Discussion from "./Discussion";
import Texting from "./Texting";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { seeMessage } from "../../redux/action";

const ChatBotIcon = () => {
  const { user, conversation, messages } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (conversation) {
        dispatch(seeMessage(conversation._id));
      }
    }
  }, [isOpen]);

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
      <Badge
        style={{ position: "absolute", right: "35px", bottom: "145px" }}
        badgeContent={
          messages
            ? messages
                .filter((msj) => msj.senderId !== user._id)
                .filter((msj) => msj.isSeen === false).length
            : 0
        }
        color="secondary"
      ></Badge>
    </div>
  );
};

export default ChatBotIcon;
