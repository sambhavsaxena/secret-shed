import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { login } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import "./LoginScreen.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function LoginScreen({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
      toast.success(`Sign in successful`, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <MainScreen title="Get back where you left">
      <div className="loginContainer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '140px' }}>
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail" style={{ marginBottom: '20px', width: '500px', textAlign: 'center' }}>
            <Form.Control
              required
              style={{ textAlign: 'center' }}
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" style={{ marginBottom: '20px' }}>
            <Form.Control
              required
              style={{ textAlign: 'center' }}
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit">
              Sign in
            </Button>
          </div>
        </Form>
        <div style={{ marginTop: '60px' }}>
          New to the club? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </MainScreen>
  );
}

export default LoginScreen;
