import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { register } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import "./RegisterScreen.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dotenv from "dotenv"

dotenv.config()
toast.configure()

function RegisterScreen({ history }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const postDetails = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ikigai");
      data.append("cloud_name", "dcprhtqwe");
      fetch("https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
      toast.success('Sign in successful', {
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
    if (confirmpassword !== password) {
      toast.error('Passwords do not match', {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (password.length < 6) {
      toast.error(`Password must be over 6 characters`, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else dispatch(register(name, email, password, pic));
  };

  return (
    <MainScreen title="share your love for words">
      <div className="loginContainer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler} style={{ marginBottom: '20px', width: '500px', textAlign: 'center' }}>
          <Form.Group controlId="name">
            <Form.Control className="text-center my-4"
              required
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" style={{ marginBottom: '20px', width: '500px', textAlign: 'center' }}>
            <Form.Control className="text-center"
              required
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" style={{ marginBottom: '20px', width: '500px', textAlign: 'center' }}>
            <Form.Control className="text-center"
              required
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" style={{ marginBottom: '20px', width: '500px', textAlign: 'center' }}>
            <Form.Control
              className="text-center"
              required
              type="password"
              value={confirmpassword}
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group >
          <Form.Group controlId="pic" style={{ marginBottom: '20px', width: '500px', textAlign: 'center' }}>
            <Form.File
              className="text-center"
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload profile picture"
              custom
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
            Create account
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Already have an account? <Link to="/signin">Sign in</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RegisterScreen;
