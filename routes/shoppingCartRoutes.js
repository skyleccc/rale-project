const express = require("express");
const router = express.Router();

const shoppingCartController = require("../controllers/shoppingCartController");
const validateToken = require("../middleware/authenticateToken");
const asyncHandler = require("../utils/asyncHandler");

router.post("/add", validateToken, asyncHandler(shoppingCartController.addShoppingCartController));

module.exports = router;