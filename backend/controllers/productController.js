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

    const { name, description, image, brand, category, price, countInStock } = req.body;

    if (product) {
        product.name = name;
        product.description = description;
        product.image = image;
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

// @desc    Delete a product by Id
// @route   DELETE /api/products/:id
// @access  private/admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({_id: product._id });
        res.status(200).json({
            message: "Product deleted."
        });
    } else {
        res.status(404);
        throw new Error("Resource Not Found");
    }
});

// @desc    Create a product review
// @route   POST /api/products/:id/reviews
// @access  private
const createProductReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find( // Arrays find() function. Not Mongoose function
            (review) => review.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error("The user already reviewed this product");
        } else {
            product.reviews.push({
                user: req.user._id,
                name: req.user.name,
                rating,
                comment,
            });

            product.numReviews = product.reviews.length;

            product.rating = product.reviews.reduce((a, review) => a + review.rating, 0) / product.numReviews;

            await product.save();

            res.status(201).json({
                message: "Review added",
                ...product,
            });

        }
    } else {
        res.status(404);
        throw new Error("Resource Not Found");
    }
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview };