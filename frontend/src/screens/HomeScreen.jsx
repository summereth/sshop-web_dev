import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productApiSlice.js';
import { useParams, Link } from 'react-router-dom';
import Paginate from '../components/Paginate.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import ProductCarousel from '../components/ProductCarousel.jsx';
import Meta from '../components/Meta.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';

const HomeScreen = () => {
  const { pageNumber, keyword, category: urlCategory } = useParams();
  const pageSize = 4;

  const category = urlCategory === "All" ? "" : urlCategory;
  
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber, pageSize, keyword, category });

  return (
    <>
      <Meta />
      {!keyword ? <ProductCarousel /> : (
        <Link className='btn btn-light my-3' to='/'>
          Go Back
        </Link>
      )}
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
      <>
        <h1>Latest Product</h1>
        <CategoryFilter />
        <Row>
            {data.products.map((product) => (
                // 1 col on small screen, 2 on medium, 3 on large, 4 on xlarge
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>
        <Paginate page={data.page} pages={data.pages} keyword={keyword} category={category}/>
      </>)}
    </>
  )
}

export default HomeScreen