import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import React from 'react'

const Paginate = ({ page, pages, isAdmin = false, keyword = "", category = ""}) => {
  return (
    <Pagination>
        {[...Array(pages).keys()].map((x) => (
            <LinkContainer
                key={x + 1}
                to={isAdmin ? `/admin/productlist/page/${x + 1}` 
                : keyword ? `/search/${keyword}/page/${x + 1}` 
                : category ? `/category/${category}/page/${x + 1}` 
                : `/page/${x + 1}`}
            >
                <Pagination.Item active={page === x + 1}>{x + 1}</Pagination.Item>
            </LinkContainer>
        ))}
    </Pagination>
  )
}

export default Paginate