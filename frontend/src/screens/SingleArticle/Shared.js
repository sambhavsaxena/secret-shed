import React, { useEffect, useState, useRef } from "react"
import MainScreen from "../../components/MainScreen"
import axios from "axios"
import { Button, Card } from "react-bootstrap"
import ReactMarkdown from "react-markdown"
import { useReactToPrint } from 'react-to-print'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../components/Loading";

toast.configure()

function Shared({ match }) {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [updatedAt, setupdatedAt] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const fetching = async () => {
            const { data } = await axios.get(`/api/articles/${match.params.id}`);
            setTitle(data.title);
            setContent(data.content);
            setupdatedAt(data.updatedAt.substring(0, 10));
            setLoading(false);
        };
        fetching();
    }, [match.params.id]);

    const componentRef = useRef();
    const getPDF = useReactToPrint({
        content: () => componentRef.current,
    });

    const share = () => {
        const el = document.createElement('input');
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        toast.success('Link copied to clipboard', {
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
        <MainScreen title="">
            {
                loading ? <Loading /> :
                    <Card.Body>
                        {content && (
                            <Card className="text-center" style={{ marginBottom: '20px', marginTop: '20px' }}>
                                <Card.Body ref={componentRef} style={{ marginTop: '20px' }}>
                                    <strong><div className="text-center" style={{ fontSize: '24px', marginTop: '16px', marginBottom: '4px' }}>{title}</div></strong>
                                    <ReactMarkdown className="text-center" style={{ fontSize: '12px' }}>---</ReactMarkdown>
                                    <ReactMarkdown style={{ fontSize: '12px' }}>{content}</ReactMarkdown>
                                </Card.Body>
                                <blockquote className="blockquote mb-0">
                                    <footer className="blockquote-footer text-center" style={{ marginTop: '20px' }}>
                                        Last updated:{" "}
                                        <cite>
                                            {updatedAt}
                                        </cite>
                                    </footer>
                                </blockquote>
                            </Card>
                        )}
                        {
                            content &&
                            <div style={{ marginTop: '50px', marginBottom: '20px' }}>
                                <Button
                                    variant="outline-primary"
                                    className="mx-2"
                                    onClick={() => share()}
                                >Share link</Button>
                                <Button
                                    variant="outline-primary"
                                    className="mx-2"
                                    onClick={() => getPDF()}
                                >Save as pdf</Button>
                            </div>
                        }
                    </Card.Body>
            }
        </MainScreen >
    );
}

export default Shared
