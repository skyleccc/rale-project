const express = require("express");
const router = express.Router();

const sizeController = require("../controllers/sizeController");
const validateToken = require("../middleware/authenticateToken");
const validateAdmin = require("../middleware/authenticateAdmin");
const asyncHandler = require("../utils/asyncHandler");

router.post("/add", validateToken, validateAdmin, asyncHandler(sizeController.addSizeController));
router.put("/edit/:id", validateToken, validateAdmin, asyncHandler(sizeController.editSizeController));
router.delete("/delete/:id", validateToken, validateAdmin, asyncHandler(sizeController.deleteSizeController));
router.get("/", asyncHandler(sizeController.getAllSizesController));
router.get("/:id", asyncHandler(sizeController.findSizeController));

module.exports = router;