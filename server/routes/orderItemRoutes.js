const express = require("express");
const router = express.Router();

const orderItemController = require("../controllers/orderItemController");
const validateToken = require("../middleware/authenticateToken");
const validateAdmin = require("../middleware/authenticateAdmin");
const asyncHandler = require("../utils/asyncHandler");

router.post("/add", validateToken, asyncHandler(orderItemController.addOrderItemController));
router.put("/edit/:id", validateToken, validateAdmin, asyncHandler(orderItemController.editOrderItemController));
router.delete("/delete/:id", validateToken, validateAdmin, asyncHandler(orderItemController.deleteOrderItemController));
router.get("/:id", validateToken, asyncHandler(orderItemController.findItemController));
router.get("/invID/:id", validateToken, asyncHandler(orderItemController.findItemsByInvIDController));
router.get("/ordID/:id", validateToken, asyncHandler(orderItemController.findItemsByOrdIDController));

module.exports = router;