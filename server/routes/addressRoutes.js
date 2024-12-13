const express = require("express");
const router = express.Router();

const addressController = require("../controllers/addressController");
const validateToken = require("../middleware/authenticateToken");
const asyncHandler = require("../utils/asyncHandler");

router.post("/add", validateToken, asyncHandler(addressController.addAddressController));
router.put("/edit/:id", validateToken, asyncHandler(addressController.editAddressController));
router.delete("/delete/:id", validateToken, asyncHandler(addressController.deleteAddressController));
router.get("/", validateToken, asyncHandler(addressController.getAllUserAddressesController));
router.get("/:id", validateToken, asyncHandler(addressController.getAddressController));


module.exports = router;