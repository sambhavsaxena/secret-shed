import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createArticleAction } from "../../actions/articlesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function CreateArticle({ history }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  if (!userInfo) {
    history.push("/");
  }

  const articleCreate = useSelector((state) => state.articleCreate);
  const { loading, error } = articleCreate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createArticleAction(title, content, category));
    if (!title || !content || !category) return;
    resetHandler();
    history.push("/myarticles");
    toast.success(`"${title}" created`, {
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
    <MainScreen title="Create an article">
      <Card style={{ marginTop: "50px", marginBottom: "50px" }}>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title" style={{ marginBottom: "20px" }}>
              <Form.Control
                required
                className="text-center"
                type="title"
                value={title}
                maxLength={64}
                placeholder="Give a title"
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
                placeholder="Fill up with magic"
                rows={12}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card style={{ marginBottom: "20px" }}>
                <Card.Header>Article preview</Card.Header>
                <Card.Text style={{ marginTop: "10px" }}>
                  <strong>{title}</strong>
                </Card.Text>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}
            <Form.Group controlId="content" style={{ marginBottom: "20px" }}>
              <Form.Control
                className="text-center"
                required
                type="content"
                value={category}
                maxLength={16}
                placeholder="Specify a category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <div style={{ marginTop: "50px", marginBottom: "20px" }}>
              <Button type="submit" variant="outline-primary">
                Create Article
              </Button>
              <Button
                className="mx-2"
                onClick={resetHandler}
                variant="outline-primary"
              >
                Reset Fields
              </Button>
            </div>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          {new Date().toLocaleTimeString()} | {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateArticle;
