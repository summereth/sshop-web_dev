import React from 'react'
import {Row, Col} from 'react-bootstrap'
import products from '../products'
import Product from '../components/Product'

const HomeScreen = () => {
  return (
    <>
        <h1>Latest Product</h1>
        <Row>
            {products.map((product) => (
                // 1 col on small screen, 2 on medium, 3 on large, 4 on xlarge
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
    </>
  )
}

export default HomeScreen