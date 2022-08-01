import React, { useEffect, useState } from "react"
import MainScreen from "../components/MainScreen"
import axios from "axios"
import { Button, Card, Pagination } from "react-bootstrap"

function All() {
    const [articles, setArticles] = useState([]);
    const [pages, setPages] = useState(1);
    const [iteration, setIteration] = useState(0);
    useEffect(() => {
        const fetching = async () => {
            const source = await axios.get(`/api/articles/all`);
            setArticles(source.data.slice(0 + (5 * iteration), 5 + (5 * iteration)));
            setPages(Math.ceil(source.data.length / 5));
        };
        fetching();
    }, [iteration]);

    const nextpage = async () => {
        if (iteration < pages - 1) {
            setIteration(iteration + 1);
        }
    }

    let items = [];
    for (let number = 1; number <= pages; number++) {
        items.push(
            <Pagination.Item key={number} active={false} onClick={nextpage} >
                {number}
            </Pagination.Item >
        );
    }

    const paginationBasic = (
        <div>
            <Pagination>{items}</Pagination>
        </div>
    );

    return (
        <MainScreen title="Recent Articles">
            <div>
                {
                    articles && articles.map((article) => (
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
                {pages > 1 ? paginationBasic : null}
            </div>
        </MainScreen >
    );
}

export default All
