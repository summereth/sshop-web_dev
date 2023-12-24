import { Link, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useGetOrderDetailQuery } from '../slices/ordersApiSlice';
import { usePayOrderMutation, useGetPayPalClientIdQuery } from '../slices/ordersApiSlice';
import { useEffect } from 'react';
import React from 'react'
import { Row, Col, Card, Image, ListGroup, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';

const OrderScreen = () => {

    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, error } = useGetOrderDetailQuery(orderId);

    const [payOrder, {isLoading: loadingPay}] = usePayOrderMutation();
    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    useEffect(() => {
        // if get paypal.clientId
        if (!loadingPayPal && !errorPayPal && paypal.clientId) {
            // load paypal function
            const loadPayPal = async () => {
                paypalDispatch({
                    type: "resetOptions",
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD',
                    },
                });
                paypalDispatch({
                    type: "setLoadingStatus",
                    value: "pending",
                })
            };

            // if order not paid and paypal not loaded, load paypal
            if (order && !order.isPaid && !window.paypal) {
                loadPayPal();
            }
        }
    }, [loadingPayPal, errorPayPal, paypal, order, paypalDispatch]);

    const onApproveTest = async () => {
        await payOrder({orderId, details: {payer: {}}});
        refetch();
        toast.success("Payment completed!");
    };

    const createPaymentOrder = (data, actions) => {
        return actions.order
        .create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice,
                    },
                },
            ],
        })
        .then((orderId) => (orderId));
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async function(details) {
            try {
                await payOrder({orderId, details});
                refetch();
                toast.success("Payment completed!");
            } catch (error) {
                toast.error(error.data?.message || error.message);
            }
        });
    };

    const onError = (err) => {
        toast.error(err.data?.message || err.message);
    };
    
  return isLoading ? (<Loader />) 
  : error ? (<Message variant="danger">{error.data?.message || error.error}</Message>) 
  : (
  <>
    <h1>{order.isDeliverd ? "Order Delivered" : order.isPaid ? "Order Paid" : "Order Confirmed"}</h1>
    <p>Ordered on {order.createdAt.substring(0, 10)} | OrderID: {order._id}</p>

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
                    { !order.isPaid && (
                        <ListGroup.Item>
                            {loadingPay && (<Loader />)}

                            {isPending ? (<Loader />) : (
                                <div>
                                    {/* <Button onClick={onApproveTest} style={{marginBottom: "10px"}}>
                                        Test Pay Order
                                    </Button> */}
                                    <div>
                                        <PayPalButtons
                                            createOrder={createPaymentOrder}
                                            onApprove={onApprove}
                                            onError={onError}
                                            style={{layout: "horizontal"}}
                                        />
                                    </div>
                                </div>
                            )}
                        </ListGroup.Item>
                    )}
                    {/* MARK AS DELIVERED PLACEHOLDER */}
                </ListGroup>
            </Card>
        </Col>
    </Row>
  </>
  )
}

export default OrderScreen