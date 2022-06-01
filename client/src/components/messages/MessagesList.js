import React, { useEffect, useRef, useState } from "react";
import "./MessagesList.style.css";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import {
  addMessage,
  getDiscussion,
  getProfil,
  seeMessage,
} from "../../redux/action";
import { io } from "socket.io-client";
import { useParams } from "react-router";
import { notifyMe } from "../../data";

const MessagesList = () => {
  const { user, messages,conversation } = useSelector((state) => state);
  const dispatch = useDispatch();
  let params = useParams();
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    if (user.role !== "admin") {
      dispatch(getProfil());
      dispatch(getDiscussion(user._id));
    }
  }, [user]);

  useEffect(() => {
    if (user.role === "admin") {
      dispatch(seeMessage(params.id));
    }
  }, [params,messages]);

  

  useEffect(() => {
    if (user.role !== "admin") {
      socket.current = io("ws://localhost:8900");
      socket.current.on("getMessage", (data) => {
        console.log("data", data);
        notifyMe(data.text);
        setArrivalMessage({
          senderId: data.senderId,
          text: data.text,
          conversationId: data.conversationId,
          isSeen: false,
        });
      });
    }
  }, [messages]);

  useEffect(() => {
    if (user.role !== "admin") {
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) => {
        console.log("users", users);
      });
    }
  }, [user]);

  useEffect(() => {
    if(user.role!=="admin"){
      if (arrivalMessage) {
        dispatch(addMessage(arrivalMessage));
      }
    }
  }, [arrivalMessage]);

  // auto scroll (scrolling to the buttom of the page automaticily)
  useEffect(() => {
    if (user.role !== "admin") {
      let box = document.querySelector(".discussionArea");
      box.scrollTop = box.scrollHeight;
    } else {
      let box = document.querySelector(".discussionBox");
      box.scrollTop = box.scrollHeight;
    }
  }, [messages]);

  // console.log(Date.parse(messages[messages.length-1].createAt))
  return (
    <div className="messages">
      {messages ? (
        user.role === "admin" ? (
          messages
            .filter((msg) => msg.conversationId === params.id)
            .map((msg, i) => <Message msg={msg} key={i} />)
        ) : (
          messages.map((msg, i) => <Message msg={msg} key={i} />)
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default MessagesList;
