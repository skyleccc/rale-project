const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const validateToken = require("../middleware/authenticateToken");
const validateAdmin = require("../middleware/authenticateAdmin");
const asyncHandler = require("../utils/asyncHandler");

router.post("/add", validateToken, asyncHandler(orderController.addOrderController));
router.put("/edit/:id", validateToken, validateAdmin, asyncHandler(orderController.editOrderController));
router.delete("/delete/:id", validateToken, validateAdmin, asyncHandler(orderController.deleteOrderController));
router.get("/", validateToken, asyncHandler(orderController.getAllOrdersByUserController));
router.get("/:id", validateToken, asyncHandler(orderController.findOrderController));

module.exports = router;