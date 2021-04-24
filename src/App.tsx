import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Col, FormControl, InputGroup, Row, Container, Accordion, Card } from 'react-bootstrap';
function TitleSection() {
  return (
    <Row className="d-flex justify-content-center mb-5">
      <Col md={8}>
        <h1 className="d-flex justify-content-center" style={{ fontSize: 50 }}>Todos</h1>
      </Col>
    </Row>
  );
}
function SearchSection() {
  return (
    <Row className="d-flex justify-content-center">
      <Col md={8}>
        <InputGroup>
          <FormControl placeholder="Search a todo by id" />
          <InputGroup.Append>
            <Button variant="outline-secondary">Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </Col>
    </Row>
  );
}

function DisplayTodosSection(props: any) {

  if (props.todos.length === 0) {
    return (
      <div>Waiting for the list</div>
    );
  } else {
    return (
      <Row className="d-flex justify-content-center mt-5">
        <Col md={8}>
          <ul style={{ padding: 0 }}>
            {props.todos.map((todo: ITodo, i: number) => {
              return <Todo key={i} {...todo} />
            })}
          </ul>
        </Col>
      </Row>
    );
  }
}

function Todo(props: ITodo) {
  console.log(props)
  return (
    <li style={{ listStyle: 'none' }}>
      <Accordion>
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <Accordion.Toggle as={Button} variant="link" eventKey={props.id.toString()}>
              {props.title}
            </Accordion.Toggle>
            <span className="mt-2">Date created: {props.date}</span>
          </Card.Header>
          <Accordion.Collapse eventKey={props.id.toString()}>
            <Card.Body>{props.description}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </li>
  );
}

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/api/todo').then(res => res.json()).then((result) => {
      setTodos(result);
    }, (error) => {
      console.log(error);
    })
  }, [])
  return (
    <>
      <Container>
        <TitleSection />
        <SearchSection />
        <DisplayTodosSection todos={todos} />
      </Container>
    </>
  );
}

interface ITodo {
  completed: string;
  date: string;
  description: string;
  id: number;
  title: string;
}

export default App;
