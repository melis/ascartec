const express = require("express");
const { check } = require("express-validator");
const usersController = require("../controllers/users-controllers");
const productController = require("../controllers/product-controllers");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

// router.get("/", usersController.getUsers);

router.post(
  "/signup",

  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

router.use(checkAuth); //  Проверка авторизации

router.get("/faworites", productController.getFaworiteProducts);
router.post("/faworites", productController.addFaworiteProduct);

module.exports = router;
