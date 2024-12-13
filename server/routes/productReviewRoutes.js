const express = require("express");
const router = express.Router();

const productReviewController = require("../controllers/productReviewController");
const validateToken = require("../middleware/authenticateToken");
const validateAdmin = require("../middleware/authenticateAdmin");
const asyncHandler = require("../utils/asyncHandler");

router.post("/add", validateToken, asyncHandler(productReviewController.addProductReviewController));
router.delete("/delete/:id", validateToken, asyncHandler(productReviewController.deleteProductReviewController));
router.get("/:id", validateToken, asyncHandler(productReviewController.findProductReviewController));
router.get("/userID/:id", validateToken, asyncHandler(productReviewController.findAllProductReviewByUserController));
router.get("/productID/:id", validateToken, asyncHandler(productReviewController.findAllProductReviewByProductController));

module.exports = router;