import React, { useState } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, sendMessage } from "../redux/action";
import { color } from "@mui/system";

const Texting = () => {
  const { conversation } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const handelSend = (e) => {
    e.preventDefault();
    dispatch(sendMessage(conversation._id, { text }));
    setText("");
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
