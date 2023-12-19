import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    Create a new order
// @route   POST /api/orders
// @access  private
const createOrder = asyncHandler(async (req, res) => {
    res.send("Create a new order");
});

// @desc    Get user's orders
// @route   GET /api/orders/myorders
// @access  private
const getMyOrders = asyncHandler(async (req, res) => {
    res.send("Get my orders");
});

// @desc    Get order by Id
// @route   GET /api/orders/:id
// @access  private/admin
const getOrderById = asyncHandler(async (req, res) => {
    res.send("Get order by Id");
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