import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react'

const CategoryFilter = () => {
    // This doesn't work. When refresh the page, "" will be automatically selected
    const { category: urlCategory } = useParams;

    const [category, setCategory] = useState(urlCategory | "");
    const navigate = useNavigate();

    useEffect(() => {
        if (category) {
            navigate(`/category/${category}`);
        } else {
            navigate("/");
        }
    }, [category, navigate]);

  return (
    <Form className='d-flex'>
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
    </Form>
  )
}

export default CategoryFilter