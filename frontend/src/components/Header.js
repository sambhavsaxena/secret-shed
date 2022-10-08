import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { } from "react-router-dom";
import { logout } from "../actions/userActions";

function Header({ setSearch }) {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [username, setUsername] = useState("");
  const logoutHandler = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (userInfo) {
      if (userInfo.name <= 7) {
        setUsername(userInfo.name);
      }
      else {
        setUsername(userInfo.name.substring(0, 7) + "...");
      }
    }
    else {
      return;
    }
  }, [userInfo]);
  return (
    <Navbar collapseOnSelect expand="lg" bg="light">
      <Container>
        <div style={{paddingRight:"10%"}}>
          <Navbar.Brand href="/">IKIGAI</Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            {userInfo && (
              <Form inline style={{margin:"2%"}}>
                <FormControl
                  type="text"
                  placeholder="Find article"
                  className="mr-sm-2 text-center"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            )}
          </Nav>
          <Nav>
            {userInfo ? (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <NavDropdown
                  title="USER"
                  id="collasible-nav-dropdown"
                  style={{width:"100%"}}
                >
                  <NavDropdown.Item href="/profile">
                    <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: '5px', borderRadius: '50%' }}
                    />{username}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className="text-center" href="/myarticles">
                    My articles
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className="text-center" href="/rules">
                    Rules
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler} className="text-center">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/rules">Rules</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/sign">Sign</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
