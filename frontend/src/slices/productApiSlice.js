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
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: "POST",
            }),
            // Refresh data instead of caching
            invalidatesTags: ['Product'],
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailQuery, useCreateProductMutation } = productApiSlice;