import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { register } from "../../actions/userActions";
import MainScreen from "../../components/MainScreen";
import "./RegisterScreen.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function RegisterScreen({ history }) {
  const cloud = `dcprhtqwe`;
  const defaultIcon =
    "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png";
  const [email, setEmail] = useState("");
  const [nextDisabled, setNextDisabled] = useState(false);
  const [name, setName] = useState("");
  const toastId = useRef(null);
  const [pic, setPic] = useState(defaultIcon);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const postDetails = (pics) => {
    setNextDisabled(true);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ikigai");
      data.append("cloud_name", cloud);
      toastId.current = toast.warn("Uploading image", {
        position: "bottom-right",
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: false,
      });
      fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          toast.dismiss(toastId.current);
          toast.success("Image uploaded", {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            autoClose: 2000,
          });
          setNextDisabled(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (confirmpassword !== password) {
      toast.error("Passwords do not match", {
        position: "bottom-right",
        autoClose: 3000,
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
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else dispatch(register(name, email, password, pic));
  };

  return (
    <MainScreen title="share your love for words">
      <div
        className="loginContainer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group
            controlId="name"
            style={
              window.innerWidth <= 600
                ? { marginBottom: "20px", width: "90vw", textAlign: "center" }
                : { marginBottom: "20px", width: "40vw", textAlign: "center" }
            }
          >
            <Form.Control
              className="text-center my-4"
              required
              type="name"
              value={name}
              placeholder="Enter name"
              maxLength={40}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Control
              className="text-center"
              style={{ marginBottom: "20px" }}
              required
              type="email"
              value={email}
              maxLength={40}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control
              className="text-center"
              style={{ marginBottom: "20px" }}
              required
              type="password"
              value={password}
              maxLength={100}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control
              style={{ marginBottom: "20px" }}
              className="text-center"
              required
              type="password"
              value={confirmpassword}
              maxLength={100}
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Form.File
              className="text-center"
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload profile picture"
              custom
            />
          </Form.Group>
          <Button
            disabled={nextDisabled}
            variant="primary"
            type="submit"
            style={{ marginTop: "20px" }}
          >
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
