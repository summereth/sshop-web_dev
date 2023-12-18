import FormContainer from "../components/FormContainer.jsx";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from 'react'

const LoginScreen = () => {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
          type="email"
          value={email} 
          placeholder="Please enter your account email"
          onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password Address</Form.Label>
          <Form.Control 
          type="password"
          value={password} 
          placeholder="Please enter your account password"
          onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New to SShop? <Link to="/register">Register now</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen