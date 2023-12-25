import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js"

// @desc    Fetch all products
// @route   GET /api/products
// @access  public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});


// @desc    Fetch a product by Id
// @route   GET /api/products/:id
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
});

// @desc    Create a sample product
// @route   POST /api/products
// @access  private/admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        name: "Sample product",
        image: "/images/sample.jpg",
        description: "Sample description",
        brand: "Sample",
        category: "Sample",
        price: 0,
        countInStock: 0,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
});

// @desc    Update a product by Id
// @route   PUT /api/products/:id
// @access  private/admin
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    const { name, description, brand, category, price, countInStock } = req.body;

    if (product) {
        product.name = name;
        product.description = description;
        product.brand = brand;
        product.category = category;
        product.price = price;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Resource Not Found");
    }
});

export { getProducts, getProductById, createProduct, updateProduct };