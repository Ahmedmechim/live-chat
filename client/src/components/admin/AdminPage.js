import React, { useEffect } from "react";
import "./AdminPage.style.css";

import { Container, Row, Col } from "react-grid-system";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getAllConversations, getUsers } from "../../redux/action";
import Texting from "../chatIcon/Texting";
import MessagesList from "../messages/MessagesList";
import Conversations from "./Conversations";
import { useParams } from "react-router";


const AdminPage = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    dispatch(getAllConversations());
    dispatch(getUsers());
  }, []);
  return (
    <div>
      {user && user.role === "admin" ? (
        <Container style={{ margin: "0", maxWidth: "none" }}>
          <Row>
            <Col style={{ background: "red" }} sm={3}>
              <Conversations />
            </Col>
            <Col className="messangerBox" style={{ padding:"0" }} sm={6}>
            {
            !params.id?<p>open conversation</p>:
            <div >
              <div className="head">

              </div>
              <div className="discussionBox">
               <MessagesList/>
              </div>
              <Texting/>
            </div>
             }
            </Col>
            <Col style={{ background: "yellow" }} sm={3}>
              <div>profil</div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default AdminPage;
