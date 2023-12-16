import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductDetailQuery } from '../slices/productApiSlice.js';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';

const ProductScreen = () => {

    const {id: productId} = useParams();

    const { data: product, isLoading, error } = useGetProductDetailQuery(productId);

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
                            <ListGroupItem>
                                <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>)} 
        </>
    )
}

export default ProductScreen