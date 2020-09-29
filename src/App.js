import React, {useState} from 'react';
import './App.css';
import {Form, Button, Container, Row, Col} from 'react-bootstrap'

function App() {
  // const [state, setState] = useState({
  //   title:'',
  //   meta:'',
  //   desciption:'',
  //   category:'',
  //   slug:'',
  //   indexing: false
  // })

  const [title, setTitle] = useState('');
  const [meta, setMeta] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [slug, setSlug] = useState('');
  const [indexing, setIndexing] = useState(false)

  const onTitleChange = ({target}) => {
    setTitle(target.value);
  }


  return (
    <Container>
      <Row>
        <Col>
          <h2>Page generator</h2>
        </Col>
      </Row>
      <Row>
        <Col>
        <Form>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="8">
              <Form.Control type="text" placeholder="Enter title" defaultValue={title} onChange={onTitleChange} />
            </Col>
            <Col sm="2">{title}</Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextMeta">
            <Form.Label column sm="2">
              Meta
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Enter Meta"/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formTextareaDescription">
            <Form.Label column sm="2">Description</Form.Label>
            <Col sm="10">
              <Form.Control as="textarea" rows="3" placeholder="Enter description"/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextMeta">
            <Form.Label column sm="2">
              Category
            </Form.Label>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextSlug">
            <Form.Label column sm="2">
              Slug
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="unique page slug"/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formAutoUrl">
            <Form.Label column sm="2">
              Url Auto create from category and slug
            </Form.Label>
            <Col sm="10" >
              <Form.Control type="text" readOnly placeholder="Url Auto create from category and slug"/>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formIndexing">
            <Form.Label column sm="2">
              Indexing
            </Form.Label>
            <Col sm="8">
              <Form.Check type="checkbox" defaultChecked={indexing} />
            </Col>
            
            <Col sm="2">
            {indexing? "true": "false"}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formContentSelect">
            <Form.Label column sm="2">Content selector</Form.Label>
            <Col sm="8">
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>Module x</option>
                <option>Module y</option>
                <option>...</option>
              </Form.Control>
            </Col>
            <Col sm="2">
              <Button variant="primary">+</Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTodo">
          <Form.Label column sm="2">
            Todo
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue="Change Headlines + Links + Filter " />
          </Col>
        </Form.Group>
        </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
