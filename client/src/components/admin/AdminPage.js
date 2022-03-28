import React from "react";
import { Container, Row, Col } from "react-grid-system";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";



const AdminPage = () => {
  const {  user } = useSelector((state) => state);

  return (
    <div>
      {user&&user.role==="admin"?
        <Container style={{margin:"0",maxWidth:"none"}}>
             <Row>
               <Col style={{background:"red"}} sm={3}>
                <div >conversation</div>
               </Col>
               <Col style={{background:"gray"}} sm={6}>
               <div>messages</div>
               </Col>
               <Col style={{background:"yellow"}} sm={3}>
                <div>profil</div>
               </Col>
             </Row>
           </Container>:<Navigate to="/login"/>
      }
    </div>
  );
};

export default AdminPage;
