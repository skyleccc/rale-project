const express = require("express");
const router = express.Router();

const cartItemController = require("../controllers/cartItemController");
const validateToken = require("../middleware/authenticateToken");
const asyncHandler = require("../utils/asyncHandler");

router.post("/add", validateToken, asyncHandler(cartItemController.addCartItemController));
router.put("/edit/:id", validateToken, asyncHandler(cartItemController.editCartItemController));
router.delete("/delete/:id", validateToken, asyncHandler(cartItemController.deleteCartItemController));
router.get("/:id", validateToken, asyncHandler(cartItemController.findCartItemController));
router.get("/invID/:id", validateToken, asyncHandler(cartItemController.findAllCartItemsByCartIDController));

module.exports = router;
