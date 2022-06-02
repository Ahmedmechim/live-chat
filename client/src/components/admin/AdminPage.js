import React, { useEffect, useRef, useState } from "react";
import "./AdminPage.style.scss";
import { Container, Row, Col } from "react-grid-system";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import {
  addMessage,
  getAllConversations,
  getAllmessages,
  getProfil,
  getUsers,
} from "../../redux/action";
import Texting from "../chatIcon/Texting";
import MessagesList from "../messages/MessagesList";
import Conversations from "./Conversations";
import { useParams } from "react-router";
import { Avatar } from "@mui/material";
import { io } from "socket.io-client";
import { notifyMe } from "../../data";

const AdminPage = () => {
  const { user, users, allConversations, messages, isAuth } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const socket = useRef();
  let params = useParams();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    dispatch(getProfil());
    dispatch(getAllmessages());
  }, [params]);
  useEffect(() => {
    dispatch(getAllConversations());
  }, []);

  useEffect(() => {
    socket.current = io("live-chaat.herokuapp.com");
    socket.current.on("getMessage", (data) => {
      console.log("data", data);
      notifyMe(data.text);
      dispatch(getAllConversations());
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        conversationId: data.conversationId,
        isSeen: false,
      });
    });
  }, [messages]);

  useEffect(() => {
    if (user) {
      socket.current.emit("addUser", user._id);
      socket.current.on("getUsers", (users) => {
        // console.log("users", users);
      });
    }
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      dispatch(addMessage(arrivalMessage));
    }
  }, [arrivalMessage]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  let x = "";
  let recived = "";
  if (params.id) {
    x = allConversations
      .find((conversation) => conversation._id === params.id)
      .members.find((member) => member !== user._id);
    recived = users.find((user) => user._id === x).email;
  }
  return (
    <div>
      {user && isAuth ? (
        <Container style={{ margin: "0", maxWidth: "none" }}>
          <Row>
            <Col
              style={{ background: "#353D46", padding: "0", height: "100vh" }}
              md={3}
              sm={4}
              xs={3}
            >
              <Conversations />
            </Col>
            <Col
              className="messangerBox"
              style={{ background: "#F4F8F8", padding: "0", height: "100vh" }}
              md={6}
              sm={8}
              xs={9}
            >
              {!params.id ? (
                <p>open conversation</p>
              ) : (
                <div>
                  <div className="head">
                    <Avatar className="avatar">
                      {recived.charAt(0).toUpperCase()}
                    </Avatar>
                    <p style={{ margin: "0" }}>{recived}</p>
                  </div>
                  <div className="discussionBox">
                    <MessagesList />
                  </div>
                  <Texting />
                </div>
              )}
            </Col>
            <Col
              className="profil"
              style={{ background: "yellow", height: "100vh" }}
              md={3}
            >
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
