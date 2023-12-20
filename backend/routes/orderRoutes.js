import express from "express";
import { 
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(protect, admin, getOrders).post(protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.get("/:id/pay", protect, updateOrderToPaid);
router.get("/:id/deliver", protect, admin, updateOrderToDelivered);

export default router;