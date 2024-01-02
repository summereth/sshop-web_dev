// A helper function to round up numbers with 2 decimal places
const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

export const calcPrices = (orderItems) => {
    // Calculate items price
    const itemsPrice = addDecimals(orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    // Calculate shipping price (If itemsPrice is over $60 then free, else $10)
    const shippingPrice = addDecimals(orderItems.length === 0 || itemsPrice >= 60 ? 0 : 10);

    // Calculate tax price (15% tax)
    const taxPrice = addDecimals(Number(0.15 * itemsPrice));

    // Calculate total price
    const totalPrice = addDecimals(
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    );

    return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};