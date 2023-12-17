// we don't need to use createApi, which requires endpoint to deal with asynchronous requests
import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart") 
    ? JSON.parse(localStorage.getItem("cart")) 
    : {cartItems: []};

// A helper function to round up numbers with 2 decimal places
const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            } else {
                // we can't do state.cartItems.push()
                // because state is immutable. we can only make a copy of it
                state.cartItems = [...state.cartItems, item];
            }

            // Calculate items price
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

            // Calculate shipping price (If itemsPrice is over $60 then free, else $10)
            state.shippingPrice = addDecimals(state.itemsPrice >= 60 ? 0 : 10);

            // Calculate tax price (15% tax)
            state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice));

            // Calculate total price
            state.totalPrice = addDecimals(
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            );

            localStorage.setItem("cart", JSON.stringify(state));
        },
    },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice;