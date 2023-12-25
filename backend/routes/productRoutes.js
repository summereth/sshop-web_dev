import express from "express";
import { getProducts, getProductById, createProduct } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

// router.get('/', getProducts);
router.route('/').get(getProducts).post(protect, admin, createProduct); 

// router.get('/:id', getProductById);
router.route('/:id').get(getProductById);

export default router;