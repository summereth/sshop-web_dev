import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    Create a new order
// @route   POST /api/orders
// @access  private
const createOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        shippingAddress,
        paymentMethod,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No items in order");
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems: orderItems.map((item) => ({
                ...item,
                productId: item._id,
                // _id: undefined // remove the field of item._id
            })),
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

    // ToDo: verify auth user is the one who placed the order

    if (order && req.user._id.equals(order.user._id)) {
        res.status(200).json(order);
    } else if (!req.user._id.equals(order.user._id)) {
        res.status(400);
        throw new Error("You have no access to this order");
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send("Update order to paid");
});

// @desc    Update order to delivered
// @route   POST /api/orders/:id/deliver
// @access  private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send("Update order to delievered");
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  private/Admin
const getOrders = asyncHandler(async (req, res) => {
    res.send("get all orders");
});


export {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
  };