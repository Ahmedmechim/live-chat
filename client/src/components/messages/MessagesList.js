import React, { useEffect, useRef, useState } from "react";
import "./MessagesList.style.css";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { addMessage, getDiscussion, getMessages, getProfil } from "../../redux/action";
import { io } from "socket.io-client";
import { useParams } from "react-router";

const MessagesList = () => {
  const { user, messages } = useSelector((state) => state);

  const dispatch = useDispatch();
  let params = useParams();
  useEffect(() => {
    
    if (user.role === "admin") {
      dispatch(getMessages(params.id));
   
    } else {
      dispatch(getProfil());
      dispatch(getDiscussion(user._id));
    }
  }, [params]);

  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log("data", data);
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
      });
    });
  }, [messages]);

  useEffect(() => {
    if(arrivalMessage){dispatch(addMessage(arrivalMessage));}
  }, [arrivalMessage]);
  
  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log("users", users);
    });
  }, [user]);

  useEffect(() => {
    if (user.role !== "admin")
{    let box = document.querySelector(".discussionArea");
    box.scrollTop = box.scrollHeight;}
  }, [messages]);

  return (
    <div className="messages">
      {messages ? (
        messages.map((msg, i) => <Message msg={msg} key={i} />)
      ) : (
        <></>
      )}
    </div>
  );
};

export default MessagesList;
