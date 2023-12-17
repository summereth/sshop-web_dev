import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, Card, ItemGroup, Image, Form, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";
import { updateQty, removeFromCart } from "../slices/cartSlice.js";
import Message from "../components/Message.jsx";
import React from 'react'

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector( (state) => state.cart );
    const { cartItems, itemsPrice } = cart;

    // const updateQtyHandler = async (product, newQty) => {
    //     dispatch(updateQty({...product, qty: newQty}));
    // }
    const updateQtyHandler = async (product, qty) => {
        dispatch(updateQty({...product, qty}));
    }

    const removeItemHandler = async (productId) => {
        dispatch(removeFromCart(productId));
    }

    const checkoutHandler = () => {
        navigate("/login?redirect=/shipping");
    }

    return (
        <>
        <Link className='btn btn-light my-3' to='/'>
            Go Back
        </Link>

        <Row>
            <Col md={8}>
                <h1 style={{marginBottom: "20px"}}>Shopping Cart</h1>
                { cartItems.length === 0 ? (
                    <Message>Your cart is empty. <Link to='/'>Shop now!</Link></Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map( (item) => (
                            <ListGroup.Item key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid></Image>
                                    </Col>
                                    <Col md={4}>
                                        <Link to={ `/product/${item._id}` }>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as="select" value={item.qty} onChange={(evt) => updateQtyHandler(item, Number(evt.target.value))}>
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        {/* onClick must pass in a wrapped function, or the function removeItemHandler will be called immediately*/}
                                        <Button type="button" variant="light" onClick={(e) => removeItemHandler(item._id)}>
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>Subtotal {cartItems.reduce((acc, item) => acc + item.qty, 0)} items</h3>
                            ${itemsPrice}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        </>
    )
};


export default CartScreen