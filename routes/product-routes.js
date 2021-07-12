const express = require("express");
const productController = require("../controllers/product-controllers");
// const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:pid", productController.getProductById);
router.get("/", productController.getProducs);
router.post("/", productController.createProduct);
router.delete("/:pid", productController.deleteProduct);

module.exports = router;
