import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import Message from './Message';
import React from 'react'


const AdminRoute = () => {

    const { userInfo } = useSelector((state) => state.auth);

    return userInfo && userInfo.isAdmin ? (<Outlet />) : (<Message variant="danger">Admin access required</Message>);

}

export default AdminRoute