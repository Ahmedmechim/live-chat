import { TextField } from "@mui/material";
import React, {  useState } from "react";
import "./Discussion.style.css";
import { useDispatch, useSelector } from "react-redux";
import { connectInter } from "../../redux/action";
import MessagesList from "../messages/MessagesList";

const Discussion = () => {
  const { user } = useSelector((state) => state);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  let handelSubmit=(e)=>{
    e.preventDefault();
    dispatch(connectInter({email}))
  }
  return (
    <div className="discussionArea">
      {!user ? (
        <form onSubmit={handelSubmit}>
          <p className="mailDiscreption">
            Veuillez laisser votre adresse e-mail au cas où nous aurions besoin
            de vous contacter par e-mail:
          </p>
          <TextField
            required
            id="standard-required"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
         <button className="btnSend"  type="submit">
           envoyer
         </button>
        </form>
      ) : (
        <MessagesList/>
      )}
    </div>
  );
};

export default Discussion;
