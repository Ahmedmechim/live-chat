import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllConversations } from "../../redux/action";
import { Link } from "react-router-dom";

const Conversations = () => {
  const { allConversations } = useSelector((state) => state);
 
  return (
    <div>
      {allConversations.map((conv, i) => (
        <Link to={`/${conv._id}`}>
          <p>{conv._id}</p>
        </Link>
      ))}
    </div>
  );
};

export default Conversations;
