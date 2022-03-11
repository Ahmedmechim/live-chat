import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from '@material-ui/core/Button';


const Discussion = () => {
  const { user } = useSelector((state) => state);
  const [email, setEmail] = useState("");

  return (
    <div>
      {!user ? (
        <form className="discussionArea">
        <p className="mailDiscreption">Veuillez laisser votre adresse e-mail au cas où nous aurions besoin de vous contacter par e-mail :</p>
          <TextField
            required
            id="standard-required"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" color="primary" disableElevation>
      Envoyer
    </Button>
        </form>
      ) : (
        <div>t3ada</div>
      )}
    </div>
  );
};

export default Discussion;
