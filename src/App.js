import React, {useState, useEffect} from 'react';
import './App.css';
import {Form, Button, Container, Row, Col} from 'react-bootstrap'

import modulesData from './fixtures/modules'

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
  const [categories, setCategories] = useState([]);
  const [slug, setSlug] = useState('');
  const [indexing, setIndexing] = useState(false)

  const [content, setContent] = useState('')
  const [contentArray, setContentArray] = useState([]);

  const onTitleChange = ({target}) => {
    setTitle(target.value);
  }

  const onMetaChange = ({target}) => {
    setMeta(target.value);
  }

  const onDescriptionChange = ({target}) => {
    setDescription(target.value);
  }

  const onCategoryChange = ({target}) => {
    setCategory(target.value);
  }

  const onContentChange = ({target}) => {
    setContent(target.value);
  }

  const onClickCategory = () => {
    setCategories(prevCategories => {
      return (
        [...prevCategories, category]
      )
    })
  }

  const onClickContent = () => {
    setContentArray(prevContentArray =>{
      return(
        [...prevContentArray, content]
      )
    })
  }

  // use useEffect to set the default values for the select dropdowns
  useEffect(()=>{
    setContent(modulesData[0].name)
  },[])
  
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
              <Col sm="10">
                <Form.Control type="text" placeholder="Enter title" defaultValue={title} onChange={onTitleChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextMeta">
              <Form.Label column sm="2">
                Meta
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Enter Meta" defaultValue={meta} onChange={onMetaChange}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formTextareaDescription">
              <Form.Label column sm="2">Description</Form.Label>
              <Col sm="10">
                <Form.Control as="textarea" rows="3" placeholder="Enter description" defaultValue={description} onChange={onDescriptionChange}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formCategory">
              <Form.Label column sm="2">
                Category
              </Form.Label>
              <Col sm="8">
                <Form.Control as="select" defaultValue="Choose..." onChange={onCategoryChange}>
                  <option>Choose...</option>
                  <option>Category x</option>
                  <option>Category y</option>
                  <option>...</option>
                </Form.Control>
              </Col>
              <Col sm="2">
                <Button variant="primary" onClick={onClickCategory}>+</Button>
              </Col>
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
              <Col sm="10">
                <Form.Check type="checkbox" defaultChecked={indexing} onChange={() => setIndexing(!indexing)} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formContentSelect">
              <Form.Label column sm="2">Content selector</Form.Label>
              <Col sm="8">
                <Form.Control as="select" defaultValue="Choose..." onChange={onContentChange}>
                  {modulesData.map((module) => (
                    <option key={module.id} value={module.name}>{module.name}</option>
                  ))}
                </Form.Control>
              </Col>
              <Col sm="2">
                <Button variant="primary" onClick={onClickContent}>+</Button>
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
        <Col>
          <Row>
            <Col>title : {title}</Col>
          </Row>
          <Row>
            <Col>meta : {meta}</Col>
          </Row>
          <Row>
            <Col>description:{description}</Col>
          </Row>
          <Row>
            <Col>
            {categories.map((category, key)=>{
              return (
                <h2 key={key}>{category}</h2>
              )
            })}
            selected category : {category}
            </Col>
          </Row>
          <Row>
          <Col>
            {contentArray.map((content, key)=>{
              return (
                <Row key={key}>
                  <Col>{content} - {key}</Col>
                  <Col><Button variant="primary" size="sm">delete</Button></Col>
                </Row>
              )
            })}
            selected content : {content}
            </Col>
          </Row>
          <Row>
            <Col>
            {indexing? "indexing: true": "indexing: false"}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
