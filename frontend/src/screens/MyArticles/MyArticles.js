import React, { useEffect } from "react";
import { Accordion, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArticleAction,
  listArticles,
} from "../../actions/articlesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function MyArticles({ history, search }) {
  const dispatch = useDispatch();
  const articleList = useSelector((state) => state.articleList);
  const { loading, error, articles } = articleList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const articleDelete = useSelector((state) => state.articleDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = articleDelete;

  const articleCreate = useSelector((state) => state.articleCreate);
  const { success: successCreate } = articleCreate;

  const articleUpdate = useSelector((state) => state.articleUpdate);
  const { success: successUpdate } = articleUpdate;

  useEffect(() => {
    dispatch(listArticles());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteArticleAction(id));
      history.push("/myarticles");
      toast.success(`Content deleted!`, {
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

  return (
    <MainScreen title={`Written by you`}>
      <Link to="/create">
        <Button
          variant="outline-primary"
          style={{ marginBottom: "40px", marginTop: "50px" }}
          size="md"
        >
          Create an article
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {articles &&
        articles
          .filter(
            (filteredArticle) =>
              filteredArticle.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              filteredArticle.category
                .toLowerCase()
                .includes(search.toLowerCase())
          )
          .reverse()
          .map((article) => (
            <Accordion key={article._id}>
              <Card style={{ margin: 10 }}>
                <Card.Header
                  style={
                    window.innerWidth <= 600
                      ? { display: "flex", flexDirection: "column" }
                      : { display: "flex" }
                  }
                >
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      fontWeight: "bold",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {article.title}
                      {window.innerWidth <= 600 ? <hr /> : null}
                    </Accordion.Toggle>
                  </span>
                  <div>
                    <Button href={`/article/${article._id}`}>Edit</Button>
                    <Button
                      className="mx-2"
                      onClick={() => deleteHandler(article._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown
                        className="text-center"
                        style={{ fontSize: "12px" }}
                      >
                        {article.content}
                      </ReactMarkdown>
                      <footer
                        className="blockquote-footer text-center"
                        style={{ marginTop: "20px" }}
                      >
                        Created:{" "}
                        <cite title="Source Title">
                          {article.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
    </MainScreen>
  );
}

export default MyArticles;
