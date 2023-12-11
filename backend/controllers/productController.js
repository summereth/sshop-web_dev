import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js"

// @desc    Fetch all products
// @route   /api/products
// @access  public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});


// @desc    Fetch a product by Id
// @route   /api/products/:id
// @access  public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    } else {
        // res.status(404).json({message: "Resource Not Found"});
        res.status(404);
        throw new Error("Resource Not Found");
    }
})

export { getProducts, getProductById };