import React, { useEffect, useState, useRef } from "react"
import MainScreen from "../../components/MainScreen"
import axios from "axios"
import { Button, Card } from "react-bootstrap"
import ReactMarkdown from "react-markdown"
import { useReactToPrint } from 'react-to-print'

function Shared({ match }) {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/notes/${match.params.id}`);
            setTitle(data.title);
            setContent(data.content);
        };
        fetching();
    }, [match.params.id]);

    const componentRef = useRef();
    const getPDF = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <MainScreen title="">
            <Card.Body>
                {content && (
                    <Card className="text-center" style={{ marginBottom: '20px', marginTop: '20px' }}>
                        <Card.Header><strong><div className="text-center" style={{ fontSize: '24px', marginTop: '10px', marginBottom: '10px' }}>{title}</div></strong></Card.Header>
                        <Card.Body ref={componentRef} style={{ marginTop: '20px' }}>
                            <ReactMarkdown className="text-center" style={{ fontSize: '12px' }}>{content}</ReactMarkdown>
                        </Card.Body>
                    </Card>
                )}
                <div style={{ marginTop: '50px', marginBottom: '20px' }}>
                    <Button
                        variant="outline-primary"
                        className="mx-2"
                        onClick={() => getPDF()}
                    >Save as pdf</Button>
                </div>
            </Card.Body>
        </MainScreen >
    );
}

export default Shared
