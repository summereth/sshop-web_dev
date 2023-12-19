import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice';
import { Form, Button, Col } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {

    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { shippingAddress } = useSelector((state) => state.cart);

    useEffect(() => {
        if (!shippingAddress) {
            navigate("/shipping");
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    };

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as="legend">Select Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        className='my-2'
                        value={paymentMethod}
                        id='PayPal'
                        name='PaymentMethod'
                        label="PayPal or Credit Card"
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col>
                {/* <Col>
                    <Form.Check
                        type='radio'
                        className='my-2'
                        value="Stripe"
                        id='Stripe'
                        name='PaymentMethod'
                        label="Stripe"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Col> */}
            </Form.Group>

            <Button variant='primary' className='mt-2' type='submit'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen