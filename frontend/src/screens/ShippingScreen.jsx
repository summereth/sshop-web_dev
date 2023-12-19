import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import React from 'react'

const ShippingScreen = () => {

    const { shippingAddress } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingAddress?.address || "");
    const [city, setCity] = useState(shippingAddress?.city || "");
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
    const [country, setCountry] = useState(shippingAddress?.country || "");

    const navigate = useNavigate();
    const dispatch = useDispatch();
     
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addShippingAddress({ address, city, postalCode, country }));
        navigate("/payment");
    };

  return (

    <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type='text'
                    value={address}
                    placeholder='Please enter your address'
                    onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='text'
                    value={city}
                    placeholder='Please enter your city'
                    onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type='text'
                    value={postalCode}
                    placeholder='Please enter your postal code'
                    onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type='text'
                    value={country}
                    placeholder='Please enter your country'
                    onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button className='my-2' variant='primary' type='submit'>
                Continue
            </Button>
        </Form>

        
    </FormContainer>
  )
}

export default ShippingScreen;