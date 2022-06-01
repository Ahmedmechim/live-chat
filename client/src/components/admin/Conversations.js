import React, { useState } from "react";
import { Avatar } from "@mui/material";
import "./Conversations.style.scss";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Badge from "@mui/material/Badge";

const Conversations = () => {
  const { user, allConversations, users, messages } = useSelector(
    (state) => state
    );


  let params = useParams();

  const [search, setSearch] = useState('')


  // get the number of messages not seen in one discision
  const getNumber = (convId) => {
    let number = messages
      .filter((msj) => msj.conversationId === convId)
      .filter((msj) => msj.senderId !== user._id)
      .filter((msj) => msj.isSeen === false);
    return number;
  };
  // const sortedActivities = allConversations.sort((a, b) => b.date - a.date)

  console.log(allConversations.map((conv)=>(users.find((user) => user._id == conv.members[1]).email)).filter(e=>e.toLowerCase().includes(search.toLowerCase())))
  
  return (
    <div>
      <input className="search" type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="    recherche"></input>
      <div className="conversations">
        {allConversations.map((conv, i) => (
          <Link to={`/${conv._id}`} key={i}>
            <div
              className="conversation"
              id={params.id === conv._id ? "isOpen" : ""}
            >
              <Avatar className="avatar">
                {users
                  .find((user) => user._id == conv.members[1])
                  .email.charAt(0)
                  .toUpperCase()}
              </Avatar>
              <p>{users.find((user) => user._id == conv.members[1]).email}</p>
              <Badge
                style={{ position: "absolute", right: "20px" }}
                badgeContent={
                  params.id === conv._id || !messages
                    ? 0
                    : getNumber(conv._id).length
                }
                // color="primary"
              ></Badge>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Conversations;
