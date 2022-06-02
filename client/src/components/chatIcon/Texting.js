import React, { useEffect, useRef, useState } from "react";
import "./Texting.style.css";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { createConversation, sendMessage } from "../../redux/action";
import { useParams } from "react-router";
import { io } from "socket.io-client";

const Texting = () => {
  const { user, conversation, messages, allConversations } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();
  let params = useParams();

  let receiverId = null;
  if (conversation) {
    receiverId = conversation.members.find((member) => member !== user._id);
  } else if (allConversations) {
    receiverId = allConversations
      .find((conversation) => conversation._id === params.id)
      .members.find((member) => member !== user._id);
  } else {
    receiverId = null;
  }

  const [text, setText] = useState("");

  const socket = useRef();
  useEffect(() => {
    socket.current = io("live-chaat.herokuapp.com");
  }, []);

  const handelSend = (e) => {
    if (messages.length !== 0) {
      e.preventDefault();
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        conversationId: user.role === "admin" ? params.id : conversation._id,
        text: text,
      });
      dispatch(sendMessage(params.id || conversation._id, { text }));
      setText("");
    } else {
      e.preventDefault();
      dispatch(createConversation(user._id, { text }));
      socket.current.emit("sendConversation", {
        senderId: user._id,
        receiverId,
        conversationId: conversation._id,
      });
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        conversationId: user.role === "admin" ? params.id : conversation._id,
        text: text,
      });
      setText("");
    }
  };
  // let input = document.querySelector(".textMessage");
  // console.log("input",input)
  // if(input){
  //   input.addEventListener("keypress", function (e) {
  //     // If the user presses the "Enter" key on the keyboard
  //     if (e.which === 13 && !e.shiftKey) {
  //       // Cancel the default action, if needed
  //       e.preventDefault();
  //       // console.log("pressed")
  //       // Trigger the button element with a click
  //      ()=>{ handelSend;}
  //     }
  //   });
  // }

  return (
    <div className="texting">
      <textarea
        className="textMessage"
        placeholder="write a message"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onSubmit={handelSend}
      ></textarea>
      <div className="icons">
        <EmojiEmotionsIcon />
        <SendIcon
          style={
            text.length === 0
              ? { color: "rgb(203, 209, 214)" }
              : { color: "rgb(0, 204, 255)" }
          }
          onClick={handelSend}
        />
      </div>
    </div>
  );
};

export default Texting;
