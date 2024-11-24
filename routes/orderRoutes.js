const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const validateToken = require("../middleware/authenticateToken");
const asyncHandler = require("../utils/asyncHandler");

router.post("/add", validateToken, asyncHandler(orderController.addOrderController));

module.exports = router;