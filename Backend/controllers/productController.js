const Product = require("../models/productModels");
const ErrorHandler = require("../utils/ErrorHandling");
const tryCatchError = require("../middleware/tryCatch");

// Create Product
exports.createProduct = tryCatchError(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products
exports.getAllProducts = tryCatchError(async (req, res, next) => {
  const products = await Product.find();
  if (!products || products.length === 0) {
    return next(new ErrorHandler("No products found", 404));
  }
  res.status(200).json({
    success: true,
    products,
  });
});

// Update Product
exports.updateProduct = tryCatchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Get Product By Id
exports.getProductById = tryCatchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product By Id
exports.deleteProduct = tryCatchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await Product.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});





