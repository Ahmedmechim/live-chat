import React, { useEffect } from "react";
import { Container, Row, Col } from "react-grid-system";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getAllConversations } from "../../redux/action";
import Texting from "../chatIcon/Texting";
import MessagesList from "../messages/MessagesList";
import Conversations from "./Conversations";
import { useParams } from "react-router";


const AdminPage = () => {
  const { user,messages } = useSelector((state) => state);
  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    dispatch(getAllConversations());
  }, []);
  return (
    <div>
      {user && user.role === "admin" ? (
        <Container style={{ margin: "0", maxWidth: "none" }}>
          <Row>
            <Col style={{ background: "red" }} sm={3}>
              <Conversations />
            </Col>
            <Col style={{ background: "gray" }} sm={6}>
            {
            !params.id?<p>open conversation</p>:
            <div>
               <MessagesList/>
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
