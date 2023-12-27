import { Row, Col, Table, Button } from 'react-bootstrap';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
import React from 'react';
import { FaEdit, FaTimes, FaCheck } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTrash } from 'react-icons/fa6';

const UserListScreen = () => {

    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [ deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

    const deleteUserHandler = async (userId) => {
        if (window.confirm("Please confirm you are deleting a user")) {
            try {
                await deleteUser(userId);
                refetch();
                toast.success("User deleted");
            } catch (error) {
                toast.error(error.data?.message || error.error );
            }
        }
    };


  return (
    <>
    <Row className='align-items-center'>
        <Col>
            <h1>Users</h1>
        </Col>
    </Row>
    { isLoading ? <Loader />
    : error ? <Message variant="danger">error.data?.message || error.error</Message> 
    : (
        <Table hover striped responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                        <td>{ user.isAdmin ? (
                            <FaCheck style={{color: "green"}}/>
                        ) : (
                            <FaTimes style={{color: "red"}}/>
                        ) }</td>
                        <td>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                <Button type='button' className='btn-sm mx-2' variant='light'><FaEdit /></Button>
                            </LinkContainer>
                            { loadingDelete ? <Loader /> : (
                                <Button className='btn-sm' variant='danger' onClick={(e) => deleteUserHandler(user._id)}><FaTrash style={{color: "white"}}/></Button>
                            )}
                            
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )}
    </>
  )
}

export default UserListScreen