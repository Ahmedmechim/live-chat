import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp } from "../redux/action";

const Discussion = () => {
  const { user } = useSelector((state) => state);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  let handelSubmit=(e)=>{
    e.preventDefault();
    dispatch(userSignUp({email}))
  }
  return (
    <div>
      {!user ? (
        <form className="discussionArea" onSubmit={handelSubmit}>
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
        <div>t3ada</div>
      )}
    </div>
  );
};

export default Discussion;
