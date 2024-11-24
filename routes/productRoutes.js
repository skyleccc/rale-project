const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const validateToken = require("../middleware/authenticateToken");
const validateAdmin = require("../middleware/authenticateAdmin");
const asyncHandler = require("../utils/asyncHandler");

router.post("/add", validateToken, validateAdmin, asyncHandler(productController.addProductController));
router.put("/edit/:id", validateToken, validateAdmin, asyncHandler(productController.editProductController));
router.delete("/delete/:id", validateToken, validateAdmin, asyncHandler(productController.deleteProductController));
router.get("/", asyncHandler(productController.getAllProductsController));
router.get("/:id", asyncHandler(productController.getProductController));

module.exports = router;