const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const Product = require("../models/product");
const Category = require("../models/category");

//---------------------
const getProducs = async (req, res, next) => {
  let products = [];
  const { categoryId } = req.query;

  try {
    if (categoryId) {
      products = await Product.find({ categoryId });
    } else {
      products = await Product.find();
    }
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a product.",
      500
    );
    return next(error);
  }

  res.json({ products });
};

//--------------------------
const getProductById = async (req, res, next) => {
  const { pid } = req.params;

  let product;
  try {
    product = await Product.findById(pid);
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  if (!pid) {
    const error = new HttpError(
      "Could not find product for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ product });
};
//-------------------------------------
const getFaworiteProducts = async (req, res, next) => {
  const { userId } = req.userData;

  let userWithFowarites;
  try {
    userWithFowarites = await User.findById(userId).populate("fowarites");
  } catch (err) {
    const error = new HttpError(
      "Fetching  product failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!userWithFowarites || userWithFowarites.fowarites.length === 0) {
    return next(
      new HttpError("Could not find product for the provided user id.", 404)
    );
  }

  res.json({ fowarites: userWithFowarites.fowarites });
};

//-------------------------------

const addFaworiteProduct = async (req, res, next) => {
  const { userId } = req.userData;
  const { productId } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }
  if (user.fowarites.indexOf(productId) == -1) {
    user.fowarites.push(productId);
    await user.save();
  }

  res.json({ massage: "Product adden to fowarite" });
};

//____________

const createProduct = async (req, res, next) => {
  const { name, categoryId } = req.body;

  const createdProduct = new Product({
    name,
    categoryId,
  });

  let category;
  try {
    category = await Category.findById(categoryId);
  } catch (err) {
    const error = new HttpError(
      "Creating product failed, please try again.",
      500
    );
    return next(error);
  }

  if (!category) {
    const error = new HttpError("Could not find category id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdProduct.save({ session: sess });
    category.products.push(createdProduct);
    await category.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating product failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ createdProduct });
};
//-----------------------

const deleteProduct = async (req, res, next) => {
  const { pid } = req.params;

  let product;
  try {
    product = await Product.findById(pid);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete product.",
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError("Could not find product for this id.", 404);
    return next(error);
  }

  try {
    await product.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete product.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted product." });
};

exports.getProductById = getProductById;
exports.getFaworiteProducts = getFaworiteProducts;
exports.addFaworiteProduct = addFaworiteProduct;
exports.createProduct = createProduct;
exports.deleteProduct = deleteProduct;
exports.getProducs = getProducs;
