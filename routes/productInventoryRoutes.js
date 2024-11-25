const express = require("express");
const router = express.Router();

const productInventoryController = require("../controllers/productInventoryController");
const validateToken = require("../middleware/authenticateToken");
const validateAdmin = require("../middleware/authenticateAdmin");
const asyncHandler = require("../utils/asyncHandler");

router.post("/add", validateToken, validateAdmin, asyncHandler(productInventoryController.addProductToInventoryController));
router.put("/edit/:id", validateToken, validateAdmin, asyncHandler(productInventoryController.editQuantityController));
router.delete("/delete/:id", validateToken, validateAdmin, asyncHandler(productInventoryController.deleteProductFromInventoryController));
router.get("/", asyncHandler(productInventoryController.getAllProductInInventoryController));
router.get("/:id", asyncHandler(productInventoryController.findProductController));

module.exports = router;