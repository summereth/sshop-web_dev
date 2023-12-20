import { Card, Row, Col, Button, ListGroup, Image } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import React from 'react'
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { 
        shippingAddress, 
        paymentMethod, 
        cartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    } = useSelector((state) => state.cart);

    const [createOrder, {isLoading, error}] = useCreateOrderMutation();

    // remove dependency here in case it'll execute when we clearCart after placing the order
    useEffect( () => {
        if (!shippingAddress.address) {
            navigate("/shipping");
        } else if (paymentMethod === "") {
            navigate("/payment");
        }
    }, );

    const placeOrderHandler = async() => {
        if (cartItems.length === 0) {
            toast("Your cart is empty!");
            return;
        }

        try {
            const res = await createOrder({
                orderItems: cartItems,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
                shippingAddress,
                paymentMethod,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    };

  return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {paymentMethod}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        
                        {cartItems.length === 0 ? (
                            <Message>Your cart is empty</Message>
                        ) : (
                            <ListGroup variant='flush'>
                                {cartItems.map((item, index) => (
                                
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
                        )}
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
                                <Col>${itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping Price:</Col>
                                <Col>${shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax Price:</Col>
                                <Col>${taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col><strong>Total:</strong></Col>
                                <Col><strong>${totalPrice}</strong></Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            { error && <Message variant='danger'>{error}</Message>}

                            <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={placeOrderHandler}
                            >
                                Place Order
                            </Button>

                            { isLoading && <Loader />}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen