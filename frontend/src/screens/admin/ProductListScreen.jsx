import { Row, Col, Table, Button } from 'react-bootstrap';
import { useGetProductsQuery } from '../../slices/productApiSlice';
import { useCreateProductMutation } from '../../slices/productApiSlice';
import { useDeleteProductMutation } from '../../slices/productApiSlice';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTrash } from 'react-icons/fa6';

const ProductListScreen = () => {

    const { data: products, refetch, isLoading, error } = useGetProductsQuery();
    const [ createProduct, {isLoading: loadingCreateProduct }] = useCreateProductMutation();
    const [ deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const deleteProductHandler = async (productId) => {
        if (window.confirm("Please confirm you are deleting a product")) {
            try {
                await deleteProduct(productId);
                refetch();
                toast.success("Product deleted!");
            } catch (error) {
                toast.error(error.data?.message || error.error );
            }
        };
        
    };

    const createProductHandler = async () => {
        try {
            await createProduct();
            refetch();
            toast.success("Product created!");
        } catch (error) {
            toast.error(error.data?.message || error.error);
        }
    };

  return (
    <>
    <Row className='align-items-center'>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='text-end'>
            { loadingCreateProduct && <Loader />}
            <Button className='btn-sm m-3' onClick={createProductHandler}>
                <FaEdit /> Create a product
            </Button>
        </Col>
    </Row>
    { isLoading ? <Loader />
    : error ? <Message variant="danger">error.data?.message || error.error</Message> 
    : (
        <Table hover striped responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                <Button type='button' className='btn-sm mx-2' variant='light'><FaEdit /></Button>
                            </LinkContainer>
                            { loadingDelete ? <Loader /> : (
                                <Button className='btn-sm' variant='danger' onClick={(e) => deleteProductHandler(product._id)}><FaTrash style={{color: "white"}}/></Button>
                            )}
                            
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )}
    </>
  )
}

export default ProductListScreen