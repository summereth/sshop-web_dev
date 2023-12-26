import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateProductMutation } from '../../slices/productApiSlice';
import { useUploadProductImageMutation } from '../../slices/productApiSlice';
import { useGetProductDetailQuery } from '../../slices/productApiSlice';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import React from 'react'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';

const UpdateProductScreen = () => {

    const { id: productId } = useParams();
    const { data: product, refetch, isLoading, error } = useGetProductDetailQuery(productId);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setPrice(product.price);
            setCountInStock(product.countInStock);
        }
    }, [product, setName, setDescription, setBrand, setCategory, setPrice, setCountInStock]);

    const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation();
    const [uploadImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
            console.log(image);
            await updateProduct({ _id: productId, name, image, description, brand, category, price, countInStock }).unwrap();
            refetch();
            toast.success("Product updated!");
        } catch (error) {
            toast.error(error.data?.message || error.error);
        }
        navigate('/admin/productlist');
    };

    // only update component state of image. product.image won't be updated unless users submit
    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        try {
            const res = await uploadImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (error) {
            toast.error(error.data?.message || error.error);
        }
    };

  return (
    <>
        <Link className='btn btn-light my-3' to='/admin/productlist'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit Product</h1>
            { isLoading && <Loader />}
            { error ? (<Message variant="danger">error.data?.message || error.error</Message>) 
            : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control 
                            type='name'
                            placeholder='Enter product name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='description' className='my-2'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter product description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='image' className='my-2'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter image url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                        { loadingUpload ? <Loader /> : (
                            <Form.Control
                                type='file'
                                label='Choose a file'
                                onChange={uploadFileHandler}
                            />
                        )}
                        
                    </Form.Group>

                    <Form.Group controlId='brand' className='my-2'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter product brand'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='category' className='my-2'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter product category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='price' className='my-2'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            type='number'
                            placeholder='Enter product price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='countInStock' className='my-2'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control 
                            type='number'
                            placeholder='Enter product count in stock'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        />
                    </Form.Group>

                    <Button type='submit' className='btn-block my-2' variant='primary' disabled={loadingUpdate}>
                        Update
                    </Button>
                </Form>
            )}
            
        </FormContainer>
    </>
  )
}

export default UpdateProductScreen