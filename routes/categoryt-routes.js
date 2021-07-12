const express = require("express");
const Category = require("../models/category");
const router = express.Router();

router.get("/", async (req, res, next) => {
  let categories = [];
  try {
    categories = await Category.find();
  } catch (e) {}

  let e = categories.map((el) => {
    return { id: el._id, name: el.name, products_count: el.products.length };
  });

  res.json({ categories: e });
});

module.exports = router;
