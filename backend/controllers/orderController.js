import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { calcPrices } from "../utils/calcPrices.js";
import { checkIfNewTransaction, verifyPayPalPayment } from "../utils/paypal.js";


// @desc    Create a new order (updated: calculate prices on server side, instead of retrieving from client side)
// @route   POST /api/orders
// @access  private
const createOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No items in order");
    } else {
        // get the ordered items from our database
        const itemsFromDB = await Product.find({
            _id: {$in: orderItems.map((x) => x._id)},
        });

        // map over order items and use the price from our database
        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find(
                (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id.toString()
            );

            return {
                ...itemFromClient,
                productId: itemFromClient._id,
                price: matchingItemFromDB.price,
                _id: undefined, // remove the field of itemFromClient._id
            };
        });

        // calculate prices
        const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrices(dbOrderItems);

        const order = new Order({
            user: req.user._id,
            orderItems: dbOrderItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            shippingAddress,
            paymentMethod
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

// @desc    Get user's orders
// @route   GET /api/orders/myorders
// @access  private
const getMyOrders = asyncHandler(async (req, res) => {
    const order = await Order.find({user: req.user._id});
    res.status(200).json(order);
});

// @desc    Get order by Id
// @route   GET /api/orders/:id
// @access  private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    // ToDo: verify auth user is the one who placed the order or admin user

    if (order && (req.user._id.equals(order.user._id) || req.user.isAdmin)) {
        res.status(200).json(order);
    } else if (order) {
        res.status(400);
        throw new Error("You have no access to this order");
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    // verify payment by requesting PayPal API
    const { verified, value } = await verifyPayPalPayment(req.body.id);
    if ( !verified ) throw new Error("Payment not verified!");

    // check if this paypal transaction has been used before
    const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
    if ( !isNewTransaction ) throw new Error("Payment transaction has been used before!");

    const order = await Order.findById(req.params.id);

    if (order) {
        // check payment amount
        const paidCorrectAmount = order.totalPrice.toString() === value;
        if (!paidCorrectAmount) throw new Error("Incorrect payment amount!");
        
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        };

        const updatedOrder = await order.save();
        
        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name email");
    res.status(200).json(orders);
});


export {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
  };