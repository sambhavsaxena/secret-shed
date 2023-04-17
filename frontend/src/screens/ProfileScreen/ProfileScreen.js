import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const ProfileScreen = ({ history }) => {
  const cloud = `dcprhtqwe`;
  const toastId = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic.slice(5));  // removes 'http:' from pic url to establish a secure connection
    }
  }, [history, userInfo]);

  const postDetails = (pics) => {
    setDisabled(true);
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
          setDisabled(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email, pic }));
  };

  const handleChange1 = (e) => {
    setName(e.target.value);
    setDisabled(false);
  };
  const handleChange2 = (e) => {
    setEmail(e.target.value);
    setDisabled(false);
  };

  return (
    <MainScreen title="Edit profile">
      <div>
        <Row
          className="profileContainer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group
                controlId="name"
                style={{
                  marginBottom: "20px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {loading && <Loading />}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {success && (
                  <ErrorMessage variant="success">
                    Updated successfully
                  </ErrorMessage>
                )}
                <Form.Control
                  required
                  className="text-center"
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  maxLength={40}
                  onChange={(e) => handleChange1(e)}
                ></Form.Control>
              </Form.Group>
              <Form.Group
                controlId="email"
                style={{
                  marginBottom: "20px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Form.Control
                  required
                  className="text-center"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  maxLength={40}
                  onChange={(e) => handleChange2(e)}
                ></Form.Control>
              </Form.Group>
              <Form.Group
                controlId="dik"
                style={{
                  marginBottom: "20px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Form.File
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="image/png"
                  accept="image/png, image/jpeg, image/jpg"
                  label="Upload a new picture"
                  custom
                />
              </Form.Group>
              <Form.Group
                style={{
                  marginBottom: "20px",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Button type="submit" varient="primary" disabled={disabled}>
                  Update
                </Button>{" "}
                <br />
                <Button
                  href="/resetpassword"
                  varient="primary"
                  style={{ marginTop: "20px" }}
                >
                  Change password
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={pic}
              alt={name}
              className="profilePic"
              style={{
                width: "40vh",
                height: "40vh",
                borderRadius: "50%",
                margin: "auto",
              }}
            />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
