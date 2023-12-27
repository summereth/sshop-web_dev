import { apiSlice } from "./apiSlice.js";
import { PRODUCTS_URL, UPLOAD_URL } from "../constants.js";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageNumber, pageSize, keyword }) => ({ 
                url: PRODUCTS_URL,
                params: {
                    pageNumber,
                    pageSize,
                    keyword,
                },
            }),
            keepUnusedDataFor: 5,
            providesTags: ["Products"],
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
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data._id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: UPLOAD_URL,
                method: "POST",
                body: data
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: "DELETE",
            }),
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data._id}/reviews`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const { 
    useGetProductsQuery, 
    useGetProductDetailQuery, 
    useCreateProductMutation, 
    useUpdateProductMutation, 
    useUploadProductImageMutation, 
    useDeleteProductMutation,
    useCreateReviewMutation,
 } = productApiSlice;