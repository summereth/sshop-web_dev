import { Helmet } from 'react-helmet-async';
import React from 'react';

const Meta = ( { title, description, keywords }) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name='description' content={description}></meta>
        <meta name='keywords' content={keywords}></meta>
    </Helmet>
  )
}

Meta.defaultProps = {
    title: "SShop | Shop everything here!",
    description: "Shop everything here!",
    keywords: "eletronics, online shopping"
};

export default Meta