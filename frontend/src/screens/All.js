import React, { useEffect, useState } from "react"
import MainScreen from "../components/MainScreen"
import axios from "axios"
import { Button, Card } from "react-bootstrap"

function All() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetching = async () => {
            const source = await axios.get(`/api/articles/all`);
            setArticles(source.data);
        };
        fetching();
    }, []);

    return (
        <MainScreen title="Trending Articles">
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
        </MainScreen >
    );
}

export default All
