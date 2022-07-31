import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./LandingStyles.css";

function LandingPage({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/myarticles");
    }
  }, [history, userInfo]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h2 className="title">ikigai</h2>
              <p className="subtitle">Write and share your love with people</p>
            </div>
            <div className="buttonContainer">
              <Link to="/signin">
                <Button variant="outline-primary" size="md" className="landingbutton">
                  Sign in
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline-primary" size="md" className="landingbutton">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
