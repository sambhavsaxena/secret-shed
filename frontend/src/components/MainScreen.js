import React from "react";
import { Container, Row } from "react-bootstrap";
import "./Screen.css";

function MainScreen({ children, title }) {
  return (
    <div className="mainback text-center">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h4 style={window.innerWidth <= 600 ? { fontSize: "1.2rem" } : {}} className="heading">{title}</h4>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default MainScreen;
