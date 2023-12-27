import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../slices/usersApiSlice';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import React from 'react'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';

const UpdateUserScreen = () => {

    const { id: userId } = useParams();
    const { data: user, refetch, isLoading, error } = useGetUserByIdQuery(userId);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user, setName, setEmail, setIsAdmin]);

    const [updateUser, {isLoading: loadingUpdate}] = useUpdateUserMutation();

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
            await updateUser({ _id: userId, name, email, isAdmin }).unwrap();
            refetch();
            toast.success("User updated!");
        } catch (error) {
            toast.error(error.data?.message || error.error);
        }
        navigate('/admin/userlist');
    };


  return (
    <>
        <Link className='btn btn-light my-3' to='/admin/userlist'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
            { isLoading && <Loader />}
            { error ? (<Message variant="danger">error.data?.message || error.error</Message>) 
            : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control 
                            type='name'
                            placeholder='Enter user name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='email' className='my-2'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter user email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='isAdmin' className='my-2'>
                        <Form.Check 
                            type='checkbox'
                            label="Is Admin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                    </Form.Group>

                    <Button type='submit' className='btn-block my-2' variant='primary' disabled={loadingUpdate}>
                        Update
                    </Button>
                </Form>
            )}
            
        </FormContainer>
    </>
  )
}

export default UpdateUserScreen