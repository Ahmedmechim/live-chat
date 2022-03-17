import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {   getDiscussion,  getProfil } from "../redux/action";
import Message from "./Message";

const MessagesList = () => {
  const { user,messages } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfil());
    dispatch(getDiscussion(user._id));   
     
  }, []);
  useEffect(() => {
    let box = document.querySelector(".discussionArea");
    box.scrollTop = box.scrollHeight; 
     
  }, [messages]);
  

   
  return (
    <div className="messages">
     {
       messages?messages.map((msg,i)=><Message msg={msg} key={i} />):<></>
     }
    </div>
  );
};

export default MessagesList;