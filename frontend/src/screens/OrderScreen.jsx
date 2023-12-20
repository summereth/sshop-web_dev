import { Link, useParams } from 'react-router-dom';
import { useGetOrderDetailQuery } from '../slices/ordersApiSlice';
import React from 'react'
import { Row, Col, Card, Image, ListGroup } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderScreen = () => {

    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, error } = useGetOrderDetailQuery(orderId);

    
  return isLoading ? (<Loader />) 
  : error ? (<Message variant="danger">{error.data?.message || error.error}</Message>) 
  : (
  <>
    <h1>{order.isDeliverd ? "Order Delivered" : order.isPaid ? "Order Paid" : "Order Confirmed"}</h1>
    <p>Ordered on {order.createdAt} | OrderID: {order._id}</p>

    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>Shipping</h3>
                    <p><strong>Name: </strong>{order.user.name}</p>
                    <p><strong>Address: </strong>{order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                    {order.isDeliverd ? (
                        <Message>Delivered At: {order.deliveredAt}</Message>
                    ) : (
                        <Message variant="danger">Not delievered yet</Message>
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h3>Payment</h3>
                    <p><strong>Method: </strong>{order.paymentMethod}</p>
                    {order.isPaid ? (
                        <Message>Paid At: {order.paidAt}</Message>
                    ) : (
                        <Message variant="danger">Not paid yet</Message>
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h3>Order Items</h3>
                    <ListGroup variant='flush'>
                        {order.orderItems.map((item, index) => (
                        
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid/>
                                    </Col>
                                    <Col>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>
                                    <Col>
                                        {item.qty} * ${item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        
                        ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Item Price:</Col>
                            <Col>${order.itemsPrice}</Col>
                        </Row>
                   
                        <Row>
                            <Col>Shipping Price:</Col>
                            <Col>${order.shippingPrice}</Col>
                        </Row>
                    
                        <Row>
                            <Col>Tax Price:</Col>
                            <Col>${order.taxPrice}</Col>
                        </Row>
                    
                        <Row>
                            <Col><strong>Total:</strong></Col>
                            <Col><strong>${order.totalPrice}</strong></Col>
                        </Row>
                    </ListGroup.Item>
                    {/* PAY ORDER PLACEHOLDER */}
                    {/* MARK AS DELIVERED PLACEHOLDER */}
                </ListGroup>
            </Card>
        </Col>
    </Row>
  </>
  )
}

export default OrderScreen