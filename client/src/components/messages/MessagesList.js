import React, { useEffect, useRef, useState } from "react";
import "./MessagesList.style.css";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import {
  addMessage,
  getDiscussion,
  getMessages,
  getProfil,
} from "../../redux/action";
import { io } from "socket.io-client";
import { useParams } from "react-router";

const MessagesList = () => {
  const notifyMe = (text) => {
    console.log(Notification.permission);
    let showNotif=()=>{
      let notification = new Notification("MESSAGE", {
        body: text,
        icon: "https://icons.iconarchive.com/icons/johanchalibert/mac-osx-yosemite/1024/messages-icon.png",
      });  
    }
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's show a notification
      showNotif()
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          showNotif()
        }
      });
    }
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
  };

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
      notifyMe(data.text);
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
      });
    });
  }, [messages]);

  useEffect(() => {
    if (arrivalMessage) {
      dispatch(addMessage(arrivalMessage));
    }
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      // console.log("users", users);
    });
  }, [user]);

  useEffect(() => {
    if (user.role !== "admin") {
      let box = document.querySelector(".discussionArea");
      box.scrollTop = box.scrollHeight;
    }
    else {
      
      let box = document.querySelector(".discussionBox");
      box.scrollTop = box.scrollHeight;
    }
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
