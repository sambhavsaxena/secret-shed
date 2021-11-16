import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container style={{ marginBottom: '20px' }}>
        <Row>
          <Col className="text-center"> The Monospace  &copy; 2021 | By <a style={{ textDecoration: 'none' }} href="mailto:sambhavsaxena02@outlook.com"><strong>Sambhav Saxena</strong></a></Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
