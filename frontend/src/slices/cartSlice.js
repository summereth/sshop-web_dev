// we don't need to use createApi, which requires endpoint to deal with asynchronous requests
import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils.js";

const initialState = localStorage.getItem("cart") 
    ? JSON.parse(localStorage.getItem("cart")) 
    : {cartItems: []};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                // replace existing time with the item (object) passed as action payload
                // , which has an updated item.qty attribute
                // state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);

                // instead of replacement, we just update the quantity
                // so that users can keep adding x qty
                existItem.qty += item.qty;
            } else {
                // we can't do state.cartItems.push()
                // because state is immutable. we can only make a copy of it
                state.cartItems = [...state.cartItems, item];
            }

            updateCart(state);
        },

        updateQty: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                // replace existing time with the item (object) passed as action payload
                // , which has an updated item.qty attribute
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x);
            } else {
                throw Error("Update quantity failed: Item not found");
            }

            updateCart(state);
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);

            updateCart(state);
        },
    },
});

export const { addToCart, updateQty, removeFromCart } = cartSlice.actions;
export default cartSlice;