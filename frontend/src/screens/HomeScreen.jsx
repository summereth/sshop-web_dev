import React from 'react'
import { useEffect, useState } from 'react'
import {Row, Col} from 'react-bootstrap'
import axios from 'axios'
import Product from '../components/Product'

const HomeScreen = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Effect callbacks are synchronous to prevent race conditions. Put the async function inside
    const fetchProducts = async() => {
      const {data} = await axios.get('/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

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