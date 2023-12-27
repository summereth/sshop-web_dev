import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductDetailQuery, useCreateReviewMutation } from '../slices/productApiSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Image, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { addToCart } from '../slices/cartSlice.js';
import { toast } from "react-toastify";
import Rating from '../components/Rating';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';

const ProductScreen = () => {

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    // qty to add into the cart
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const {id: productId} = useParams();

    const { userInfo } = useSelector((state) => state.auth);

    const { data: product, refetch, isLoading, error } = useGetProductDetailQuery(productId);
    const [createReview, {isLoading: loadingReview }] = useCreateReviewMutation();

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty})); // pass object of product (add qty) as payload to action addToCart
        // navigate("/cart");
    };

    const submitReviewHandler = async (e) => {
        e.preventDefault();
        if (userInfo) {
            try {
                await createReview({
                    _id: product._id,
                    rating,
                    comment,
                }).unwrap();
                refetch();
                setComment("");
                setRating(0);
                toast.success("Comment successfully!");
            } catch (error) {
                toast.error(error.data?.message || error.error);
            }
        } else {
            toast.error("Please login first");
        }
    };

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error?.data?.message || error.error}</Message>
            ) : (
            <>
                <Row>
                    <Col md={5}>
                        {/* fluid makes image flexible */}
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>
                    <Col md={4}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                            </ListGroupItem>
                            <ListGroupItem>
                                Description: ${product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>${product.price}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Stock:</Col>
                                        <Col>{product.countInStock > 9 ? "In stock" : product.countInStock > 0 ? `Only ${product.countInStock} left` : "Out of stock"}</Col>
                                    </Row>
                                </ListGroupItem>
                                { product.countInStock > 0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Quantity</Col>
                                            <Col>
                                                <Form.Control as="select" value={qty} onChange={(evt) => setQty(Number(evt.target.value))}>
                                                    {[...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}
                                <ListGroupItem>
                                    <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>
                                        Add To Cart
                                    </Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                <Row className='review'>
                    <Col md={6}>
                        <h2>Reviews</h2>
                        { product.numReviews === 0 ? (<Message>No Reviews</Message>) 
                        : (
                            <ListGroup variant='flush'>
                                { product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating}/>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Write a Customer Review</h2>
                                { loadingReview && <Loader />}
                                { userInfo ? (
                                    <Form onSubmit={submitReviewHandler}>
                                        <Form.Group controlId='rating' className='my-2'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={rating}
                                                onChange={(e) => setRating(Number(e.target.value))}
                                            >
                                            <option value="">Select...</option>
                                            <option value="1">1 - Poor</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="3">3 - Good</option>
                                            <option value="4">4 - Very Good</option>
                                            <option value="5">5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId='comment' className='my-2'>
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                row="3"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>

                                        <Button type="Submit" disabled={loadingReview} variant='primary'>Submit</Button>
                                    </Form>
                                ) : (
                                    <Message>Please <Link to={"/login"}>login</Link> to write a review</Message>
                                )}
                                
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row> 
            </>)} 
        </>
    )
}

export default ProductScreen