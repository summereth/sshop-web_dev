import { apiSlice } from "./apiSlice.js";
import { PRODUCTS_URL } from "../constants.js";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({ url: PRODUCTS_URL }),
            keepUnusedDataFor: 5,
        }),
        getProductDetail: builder.query({
            query: (id) => ({ url: `${PRODUCTS_URL}/${id}` }),
            keepUnusedDataFor: 5,
        })
    }),
});

export const { useGetProductsQuery, useGetProductDetailQuery } = productApiSlice;