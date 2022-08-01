import React, { useEffect, useState } from "react"
import MainScreen from "../components/MainScreen"
import axios from "axios"
import { Button, Card, Pagination } from "react-bootstrap"
import Loading from "../components/Loading";


function All({ search }) {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextdisabled, setNextdisabled] = useState();
    const [prevdisabled, setPrevdisabled] = useState();
    const [pages, setPages] = useState(1);
    const [iteration, setIteration] = useState(0);
    const ipp = 5; //Intents per page
    useEffect(() => {
        setLoading(true);
        const fetching = async () => {
            const source = await axios.get(`/api/articles/all`);
            setArticles(source.data.slice(0 + (ipp * iteration), ipp + (ipp * iteration)));
            setPages(Math.ceil(source.data.length / ipp));
            setLoading(false);
        }
        fetching();
        if (iteration > 0 && iteration < pages - 1) {
            setPrevdisabled(false);
            setNextdisabled(false);
        }
        else if (iteration === 0) {
            setPrevdisabled(true);
            setNextdisabled(false);
        }
        else {
            setPrevdisabled(false);
            setNextdisabled(true);
        }
    }, [iteration]);

    const nextpage = () => {
        if (iteration < pages - 1) {
            setIteration(iteration + 1);
        }
    }

    const prevpage = () => {
        if (iteration > 0) {
            setIteration(iteration - 1);
        }
    }

    return (
        <MainScreen title="Recently published">
            <div>
                {
                    loading ? <Loading /> :
                        articles && articles.filter((filteredArticle) =>
                            filteredArticle.title.toLowerCase().includes(search.toLowerCase()) ||
                            filteredArticle.category.toLowerCase().includes(search.toLowerCase())
                        ).reverse().map((article) => (
                            <Card style={{ margin: 10 }} key={article._id}>
                                <Card.Header style={{ display: "flex" }}>
                                    <span
                                        style={{
                                            color: "black",
                                            flex: 1,
                                            alignSelf: "center",
                                            fontSize: 18,
                                        }}>
                                        {
                                            article.title
                                        }
                                    </span>
                                    <span style={{ flex: 1, alignSelf: "center" }}>
                                        Category:{' '}{
                                            article.category
                                        }
                                    </span>
                                    <div>
                                        <Button href={`/articles/${article._id}`} style={{ marginRight: '5px' }}>Read</Button>
                                    </div>
                                </Card.Header>
                            </Card>
                        ))
                }
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
                {
                    (pages > 1 && !loading) ?
                        <Pagination>
                            <Pagination.Item disabled={prevdisabled} onClick={prevpage}>
                                {`<<`}
                            </Pagination.Item >
                            <div style={{ marginTop: '8px' }}>
                                {iteration + 1}
                            </div>
                            <Pagination.Item disabled={nextdisabled} onClick={nextpage}>
                                {`>>`}
                            </Pagination.Item >
                        </Pagination>
                        : null
                }
            </div>
        </MainScreen >
    );
}

export default All
