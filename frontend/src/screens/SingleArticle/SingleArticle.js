import React, { useEffect, useState, useRef } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArticleAction,
  updateArticleAction,
} from "../../actions/articlesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function SingleArticle({ match, history }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");
  const [loadinganim, setLoadinganim] = useState();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const articleUpdate = useSelector((state) => state.articleUpdate);
  const { loading, error } = articleUpdate;

  const articleDelete = useSelector((state) => state.articleDelete);
  const { loading: loadingDelete, error: errorDelete } = articleDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteArticleAction(id));
      history.push("/myarticles");
      toast.success(`"${title}" deleted`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      return;
    }
  };

  if (!userInfo) {
    history.push("/");
  }

  useEffect(() => {
    setLoadinganim(true);
    const fetching = async () => {
      const { data } = await axios.get(`/api/articles/${match.params.id}`);
      if (userInfo) {
        if (data.user === userInfo._id) {
          setTitle(data.title);
          setContent(data.content);
          setCategory(data.category);
          setDate(data.updatedAt);
          setLoadinganim(false);
        } else {
          history.push("/");
          toast.error(`"Unautheticated request!"`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        history.push("/");
      }
    };

    fetching();
  }, [match.params.id, date, history, userInfo]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateArticleAction(match.params.id, title, content, category));
    if (!title || !content || !category) return;
    resetHandler();
    history.push("/myarticles");
    toast.success(`"${title}" updated`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const componentRef = useRef();
  const getPDF = useReactToPrint({
    content: () => componentRef.current,
  });

  const share = () => {
    const sharelink = document.createElement("input");
    sharelink.value =
      window.location.host +
      window.location.pathname.slice(0, 8) +
      "s/" +
      match.params.id;
    document.body.appendChild(sharelink);
    sharelink.select();
    document.execCommand("copy");
    document.body.removeChild(sharelink);
    toast.success("Link copied to clipboard", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <MainScreen title="Edit your article">
      {loadinganim ? (
        <Loading />
      ) : (
        <Card style={{ marginTop: "50px", marginBottom: "50px" }}>
          <Card.Body>
            <Form onSubmit={updateHandler}>
              {loadingDelete && <Loading />}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {errorDelete && (
                <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
              )}
              <Form.Group controlId="title" style={{ marginBottom: "20px" }}>
                <Form.Control
                  required
                  className="text-center"
                  type="title"
                  value={title}
                  maxLength={64}
                  placeholder="Edit title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="content" style={{ marginBottom: "20px" }}>
                <Form.Control
                  required
                  className="text-center"
                  as="textarea"
                  value={content}
                  maxLength={16384}
                  placeholder="Edit your spell"
                  rows={12}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              {content && (
                <Card
                  className="text-center"
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <Card.Header>Article preview</Card.Header>
                  <Card.Body ref={componentRef}>
                    <strong>
                      <div
                        className="text-center"
                        style={{
                          fontSize: "24px",
                          marginTop: "20px",
                          marginBottom: "20px",
                        }}
                      >
                        {title}
                      </div>
                    </strong>
                    <ReactMarkdown>---</ReactMarkdown>
                    <ReactMarkdown
                      className="text-center"
                      style={{ fontSize: "12px" }}
                    >
                      {content}
                    </ReactMarkdown>
                  </Card.Body>
                </Card>
              )}
              <Form.Group controlId="content" style={{ marginBottom: "18px" }}>
                <Form.Control
                  className="text-center"
                  required
                  type="content"
                  value={category}
                  maxLength={16}
                  placeholder="Edit category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              {loading && <Loading size={50} />}
              <hr />
              <div style={{ marginTop: "20px", marginBottom: "10px" }}>
                <Button
                  variant="outline-primary"
                  className="mx-2"
                  onClick={() => share()}
                >
                  Share link
                </Button>
                <Button
                  variant="outline-primary"
                  className="mx-2"
                  onClick={() => getPDF()}
                >
                  Save as pdf
                </Button>
                <Button
                  className="mx-2"
                  variant="outline-primary"
                  type="submit"
                >
                  Update Article
                </Button>
                <Button
                  className="mx-2"
                  variant="outline-primary"
                  onClick={() => deleteHandler(match.params.id)}
                >
                  Delete
                </Button>
              </div>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">{date}</Card.Footer>
        </Card>
      )}
    </MainScreen>
  );
}

export default SingleArticle;
