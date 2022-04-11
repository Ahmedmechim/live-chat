import React from "react";
import { Avatar } from "@mui/material";
import "./Conversations.style.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Conversations = () => {
  const { allConversations, users } = useSelector((state) => state);

  return (
    <div>
      <input className="search" type="text" placeholder="    recherche"></input>
      <div className="conversations">
      {allConversations.map((conv, i) => (
        <Link to={`/${conv._id}`}>
          <div className="conversation">
            <Avatar className="avatar">
              {users
                .find((user) => user._id == conv.members[1])
                .email.charAt(0)
                .toUpperCase()}
            </Avatar>
            <p>{users.find((user) => user._id == conv.members[1]).email}</p>
          </div>
        </Link>
      ))}
      </div>
    </div>
  );
};

export default Conversations;
