import FormContainer from "../components/FormContainer.jsx";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import React from 'react'

const RegisterScreen = () => {

  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, {isLoading}] = useRegisterMutation();

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
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    try {
      // Call BE login API to login & create token
      // login - mutationTrigger of useLoginMutation
      // chain .unwrap(): access the error or success payload immediately after a mutation
      // returns API response to variable res
      const res = await register({ name, email, password }).unwrap();
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
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Account Name</Form.Label>
          <Form.Control 
          type="text"
          value={name} 
          placeholder="Please enter your account name"
          onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password"
          value={password} 
          placeholder="Please enter your account password"
          onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
          type="password"
          value={confirmPassword} 
          placeholder="Please re-enter your account password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
          Register
        </Button>

        { isLoading && <Loader />}
        
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Sign in now</Link>
        </Col>
      </Row>

    </FormContainer>
  )
}

export default RegisterScreen;