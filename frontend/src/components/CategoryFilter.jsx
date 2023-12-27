import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react'

const CategoryFilter = () => {
    const { category: urlCategory } = useParams;
    const [category, setCategory] = useState(urlCategory | "");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if (category) {
            navigate(`/category/${category}`);
        } else {
            navigate("/");
        }
    };

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
        >
            <option value="">All Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Grocery">Grocery</option>
            <option value="Beauty">Beauty</option>
            <option value="Book">Book</option>
        </Form.Control>
        <Button type="submit" variant='outline' className='mx-2 p-2'>Filter</Button>
    </Form>
  )
}

export default CategoryFilter