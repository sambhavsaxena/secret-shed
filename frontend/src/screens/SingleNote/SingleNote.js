import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { jsPDF } from 'jspdf';

function SingleNote({ match, history }) {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    history.push("/myarticles");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${match.params.id}`);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(match.params.id, title, content, category));
    if (!title || !content || !category) return;
    resetHandler();
    history.push("/myarticles");
  };

  var lMargin = 10; //left margin in mm
  var rMargin = 10; //right margin in mm
  var pdfInMM = 210;  // width of A4 in mm
  function getPDF() {
    const doc = new jsPDF("p", "mm", "a4");
    const paragraph = `${content}`;
    const lines = doc.splitTextToSize(paragraph, (pdfInMM - lMargin - rMargin));
    doc.text(`${title}`, 105, 30);
    doc.setFontSize(12);
    doc.text(2 * lMargin + rMargin, 40, lines);
    doc.save(`${title}.pdf`);
  }

  return (
    <MainScreen title="Edit your article">
      <Card style={{ marginTop: '50px', marginBottom: '50px' }}>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title" style={{ marginBottom: '20px' }}>
              <Form.Control
                required
                className="text-center"
                type="title"
                value={title}
                placeholder="Edit title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content" style={{ marginBottom: '20px' }}>
              <Form.Control
                required
                className="text-center"
                as="textarea"
                value={content}
                placeholder="Edit your spell"
                rows={12}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card style={{ marginBottom: '20px' }}>
                <Card.Header>Article preview</Card.Header>
                <Card.Text style={{ marginTop: '10px' }}><strong>{title}</strong></Card.Text>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content" style={{ marginBottom: '20px' }}>
              <Form.Control
                className="text-center"
                required
                type="content"
                value={category}
                placeholder="Edit category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <div style={{ marginTop: '50px', marginBottom: '20px' }}>
              <Button className="mx-2" variant="outline-primary" type="submit">
                Update Article
              </Button>
              <Button
                variant="outline-primary"
                className="mx-2"
                onClick={() => getPDF()}
              >Save as pdf</Button>
              <Button
                className="mx-2"
                variant="outline-primary"
                onClick={() => deleteHandler(match.params.id)}>
                Delete
              </Button>
            </div>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          {new Date().toLocaleTimeString()} | {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen >
  );
}

export default SingleNote;
