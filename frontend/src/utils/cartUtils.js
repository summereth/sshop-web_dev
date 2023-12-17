// A helper function to round up numbers with 2 decimal places
const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

export const updateCart = (state) => {
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
};