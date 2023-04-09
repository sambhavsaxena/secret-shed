import React, { useEffect, useState } from "react";
import MainScreen from "../components/MainScreen";
import axios from "axios";
import { Button, Card, Pagination } from "react-bootstrap";
import Loading from "../components/Loading";
import "./All.css";

function All({ search }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isArticle, setIsArticle] = useState(false);
  const [nextdisabled, setNextdisabled] = useState();
  const [prevdisabled, setPrevdisabled] = useState();
  const [pages, setPages] = useState(1);
  const [iteration, setIteration] = useState(0);
  const [frameWidth, setFrameWidth] = useState(window.innerWidth);
  const ipp = 10; //Intents per page
  useEffect(() => {
    setLoading(true);
    const fetching = async () => {
      const source = await axios.get(`/api/articles/all`);
      if (source.data.length > 0) {
        setArticles(
          source.data.slice(0 + ipp * iteration, ipp + ipp * iteration)
        );
        setPages(Math.ceil(source.data.length / ipp));
        setLoading(false);
        setIsArticle(true);
      } else {
        setIsArticle(false);
        setLoading(false);
      }
    };
    fetching();
    if (iteration > 0 && iteration < pages - 1) {
      setPrevdisabled(false);
      setNextdisabled(false);
    } else if (iteration === 0) {
      setPrevdisabled(true);
      setNextdisabled(false);
    } else {
      setPrevdisabled(false);
      setNextdisabled(true);
    }
    setFrameWidth(window.innerWidth);
  }, [iteration, frameWidth, pages]);

  const nextpage = () => {
    if (iteration < pages - 1) {
      setIteration(iteration + 1);
    }
  };

  const prevpage = () => {
    if (iteration > 0) {
      setIteration(iteration - 1);
    }
  };

  return (
    <MainScreen title="Recently published">
      <div>
        {loading ? (
          <Loading />
        ) : isArticle ? (
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
            .map((article) => (
              <Card style={{ margin: 10 }} key={article._id}>
                <Card.Header
                  style={
                    frameWidth <= 600
                      ? { display: "flex", flexDirection: "column" }
                      : { display: "flex" }
                  }
                >
                  <span
                    style={{
                      color: "black",
                      flex: 1,
                      alignSelf: "center",
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    {article.title}
                    {frameWidth <= 600 ? <hr /> : null}
                  </span>
                  <div className="mix">
                    <span style={{ flex: 1, alignSelf: "center" }}>
                      Category: {article.category}
                    </span>
                    <div style={{ marginLeft: "50px" }}>
                      <Button href={`/articles/${article._id}`} size="sm">
                        Read Article
                      </Button>
                    </div>
                  </div>
                </Card.Header>
              </Card>
            ))
        ) : (
          <div style={{ marginTop: "15%" }}>
            <strong>No articles found</strong>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        {pages > 1 && !loading ? (
          <Pagination>
            <Pagination.Item disabled={prevdisabled} onClick={prevpage}>
              {"<<"}
            </Pagination.Item>
            <div style={{ margin: "8px" }}>
              {iteration + 1} / {pages}
            </div>
            <Pagination.Item disabled={nextdisabled} onClick={nextpage}>
              {">>"}
            </Pagination.Item>
          </Pagination>
        ) : null}
      </div>
    </MainScreen>
  );
}

export default All;
