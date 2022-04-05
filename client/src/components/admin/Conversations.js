import React from "react";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Conversations = () => {
  const { allConversations, users } = useSelector((state) => state);



  return (
    <div>
      {allConversations.map((conv, i) => (
        <Link to={`/${conv._id}`}>
          <p>{users.find(user=>user._id==conv.members[1]).email}</p>
        </Link>
      ))}
    </div>
  );
};

export default Conversations;
