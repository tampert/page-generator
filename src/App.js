import React, {useState, useEffect} from 'react';
import './App.css';
import {ListGroup, Form, Button, Container, Row, Col} from 'react-bootstrap'
import modulesData from './fixtures/modules'

function App() {
  const [title, setTitle] = useState('');
  const [meta, setMeta] = useState('');
  const [description, setDescription] = useState('');
  // const [category, setCategory] = useState('');
  // const [categories, setCategories] = useState([]);
  // const [slug, setSlug] = useState('');
  const [indexing, setIndexing] = useState(false)

  const [module, setModule] = useState('')
  const [modules, setModules] = useState([]);


  // modules + Settings
  const [selectedModules, setSeletedModules] = useState([]);


  // API calls
  const [popularCities, setPopularCities] = useState([
    {}, {}, {}, {}, {}
  ]);


  const onTitleChange = ({target}) => {
    setTitle(target.value);
  }

  const onMetaChange = ({target}) => {
    setMeta(target.value);
  }

  const onDescriptionChange = ({target}) => {
    setDescription(target.value);
  }

  // const onCategoryChange = ({target}) => {
  //   setCategory(target.value);
  // }

  const onModuleChange = ({target}) => {
    setModule(target.value);
  }

  // const onClickCategory = () => {
  //   setCategories(prevCategories => {
  //     return (
  //       [...prevCategories, category]
  //     )
  //   })
  // }

  const onClickModule = () => {
    // set default module
    // if(module.length <= 0) setModule(modulesData[0].name)
    setModules(prevModules =>{
      return(
        [...prevModules, module]
      )
    })
    // set selected module + settings
    const newModule = modulesData.find((item) => item.name === module)
    setSeletedModules([...selectedModules, newModule])
  }

  const onDeleteModule = id => {
    //https://stackoverflow.com/questions/29527385/removing-element-from-array-in-component-state
    setModules(prevModules =>{
      return(
        [...prevModules].filter((_, i) => i !== id.key)
      )
    })

    setSeletedModules(prevSelectedModules => {
      return (
        [...prevSelectedModules].filter((_, i) => i !== id.key)
      )
    })
  }

  const addModuleToPage = id => {
    const toAdd = selectedModules.filter((_, i) => i === id.key)
    console.log(toAdd)
    console.log("now add this module to the new page")
  }

  // use useEffect to set the default values for the select dropdowns
  // this is not working the way it should
  useEffect(()=>{
    console.log('use effect')
    setModule(modulesData[0].name)
    loadPopularCities();
  },[])

  const loadPopularCities = async () => {
    let popularCities;

    await fetch("https://api.govesta.co/api/v1/geo/popular?type=city&limit=10")
    .then(res => res.json())
    .then(
      (result) => {
        popularCities = result.data
        setPopularCities(popularCities);
      },
      (error) => {
        popularCities = [];
      }
    )
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
          <Row>
            <Col><h3>Settings</h3></Col>
          </Row>
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
            {/* <Form.Group as={Row} controlId="formCategory">
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
            </Form.Group> */}
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
                {/* Url Auto create from category and slug */}
                Auto slug
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
            <Form.Group as={Row} controlId="formModuleSelect">
              <Form.Label column sm="2">module selector</Form.Label>
              <Col sm="8">
                <Form.Control as="select" defaultValue="Choose..." onChange={onModuleChange}>
                  {modulesData.map((module) => (
                    <option key={module.id} value={module.name}>{module.name}</option>
                  ))}
                </Form.Control>
              </Col>
              <Col sm="2">
                <Button variant="primary" onClick={onClickModule}>+</Button>
              </Col>
            </Form.Group>
            <ListGroup>
              {selectedModules && selectedModules.map((module, key)=>{
              return (
                <ListGroup.Item  key={key}>
                <Row>
                  <Col>{module.name}</Col>
                  <Col className="text-right">
                    <Button variant="primary" className="close" aria-label="Close" size="sm" onClick={() =>{onDeleteModule({key})}}>
                      <span aria-hidden="true">&times;</span>
                    </Button>
                  </Col>
                </Row>
                    {module.props &&  module.props.map((prop, i) => {
                      return (
                        <Row key={i}>
                          <Col>{prop.name}</Col>
                          <Col><Form.Control type={prop.type} placeholder="" defaultValue={prop.value} /></Col>
                        </Row>
                      )
                    })}
                <Row>
                  <Col className="text-right"><Button variant="primary" size="sm" onClick={() =>{addModuleToPage({key})}}>Add</Button></Col>
                </Row>
                </ListGroup.Item>
              )
            })}
              </ListGroup>
          </Form>
        </Col>
        <Col style={{backgroundColor:'#eeeeee'}}>
          <Row >
            <Col><h3>Preview</h3></Col>
          </Row>
          <Row>
            <Col>title : {title}</Col>
          </Row>
          <Row>
            <Col>meta : {meta}</Col>
          </Row>
          <Row>
            <Col>description:{description}</Col>
          </Row>
          {/* <Row>
            <Col>
            {categories.map((category, key)=>{
              return (
                <h2 key={key}>{category}</h2>
              )
            })}
            selected category : {category}
            </Col>
          </Row> */}
          <Row>
          <Col>
            {modules.map((module, key)=>{
              return (
                <Row key={key}>
                  <Col>{module}</Col>
                  <Col><Button variant="primary" size="sm" onClick={() =>{onDeleteModule({key})}}>delete</Button></Col>
                </Row>
              )
            })}
            </Col>
          </Row>
          <Row>
            <Col>
            {indexing? "indexing: true": "indexing: false"}
            </Col>
          </Row>
          <Row>
            <Col>
            {popularCities && popularCities.map((item, key) => {
              return(
              <div key={key}>{item.name}</div>
              )
            })}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
