import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { Table, Form, Row, Col, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import React from 'react'

const ProfileScreen = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo, setName, setEmail]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords don't match!")
            return;
        }

        try {
            const res = await updateProfile({ name, email, password }).unwrap();
            dispatch(setCredentials(res));
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.data?.message || error.error);
        }
    };

  return (
    <Row>
        <Col md={3}>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        value={name}
                        placeholder='Enter your name'
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email' className='my-2'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        value={email}
                        placeholder='Enter your email address'
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword' className='my-2'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        placeholder='Confirm your password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" className="my-2" disabled={loadingUpdateProfile}>
                    Update
                </Button>

                { loadingUpdateProfile && <Loader />}
            </Form>
        </Col>
        <Col md={9}>Column</Col>
    </Row>
  )
}

export default ProfileScreen