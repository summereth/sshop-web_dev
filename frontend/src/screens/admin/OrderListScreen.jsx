import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { useDeliverOrderMutation } from '../../slices/ordersApiSlice';
import { Table, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import React from 'react'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';

const OrderListScreen = () => {

    const { data: orders, refetch, isLoading, error } = useGetOrdersQuery();
    // console.log(orders);
    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

    const updateDeliveredHandler = async (orderId) => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success("Update delivered!");
        } catch (error) {
            toast.error(error.data?.message || error.error);
        }
    };

  return (
    <>
        <h1>Orders</h1>
        { isLoading ? <Loader /> 
        : error ? <Message variant="danger">{error.data?.message || error.error}</Message> 
        : (
            <Table striped hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>User</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 19)}</td>
                            <td>{order.user && order.user.email}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid ? (order.paidAt.substring(0, 19)) : (<FaTimes style={{color: "red"}}/>)}</td>
                            <td>
                                {order.isDelivered ? (order.deliveredAt.substring(0, 19)) 
                                : !order.isPaid ? <FaTimes style={{color: "red"}}/> 
                                : loadingDeliver ? <Loader />
                                : (
                                    <Button className='btn-sm' variant='light' onClick={(e) => updateDeliveredHandler(order._id)}>
                                        Deliver
                                    </Button>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button className='btn-sm' variant='light'>Detail</Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        ) }
        
    </>
  )
}

export default OrderListScreen