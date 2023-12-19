import FormContainer from "../components/FormContainer.jsx";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import React from 'react'

const LoginScreen = () => {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading}] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // get redirect path, which redirects users after users login successfully
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // If user is already logged in 
  // (localStorage has credentials (state.auth.userInfo)), redirect the user
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Call BE login API to login & create token
      // login - mutationTrigger of useLoginMutation
      // chain .unwrap(): access the error or success payload immediately after a mutation
      // returns API response to variable res
      const res = await login({email, password}).unwrap();
      // Set FE credentials in localStorage
      dispatch(setCredentials({...res,}));
      // redirect users
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }

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

        <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
          Sign In
        </Button>

        { isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New to SShop? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register now</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen