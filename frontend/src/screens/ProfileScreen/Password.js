import React, { useState, useEffect } from "react";
import { Form, Button, Row } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Password = ({ history }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;
  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== "") {
      if (password !== confirmPassword) {
        return toast.error("Passwords do not match!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (password.length < 6) {
        return toast.error("Password must be over 6 characters", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    if (confirmPassword !== "") {
      if (confirmPassword !== password) {
        return toast.error(`Passwords do not match!`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (confirmPassword.length < 6) {
        return toast.error("Password must be over 6 characters", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    dispatch(updateProfile({ password }));
  };

  return (
    <MainScreen title="Edit profile">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row
          className="profileContainer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "15%",
          }}
        >
          <Form onSubmit={submitHandler}>
            {loading && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {success && (
              <ErrorMessage variant="success">
                Updated successfully
              </ErrorMessage>
            )}
            <Form.Group
              controlId="password"
              style={{
                marginBottom: "20px",
                width: "500px",
                textAlign: "center",
              }}
            >
              <Form.Control
                className="text-center"
                type="password"
                placeholder="Enter new password"
                value={password}
                maxLength={100}
                required
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group
              controlId="confirmPassword"
              style={{
                marginBottom: "20px",
                width: "500px",
                textAlign: "center",
              }}
            >
              <Form.Control
                className="text-center"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                maxLength={100}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group
              style={{
                marginBottom: "20px",
                width: "500px",
                textAlign: "center",
              }}
            >
              <Button type="submit" varient="primary">
                Update
              </Button>
            </Form.Group>
          </Form>
        </Row>
      </div>
    </MainScreen>
  );
};

export default Password;
