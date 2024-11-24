const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const validatePassword = require("../middleware/authenticatePassword");
const validateToken = require("../middleware/authenticateToken");
const asyncHandler = require("../utils/asyncHandler");

router.post("/login", validatePassword, asyncHandler(userController.loginController));
router.post("/register", asyncHandler(userController.registerController));
router.put("/editDetails/:id", validateToken, asyncHandler(userController.updateDetailsController));
router.put("/editPassword/:id", validateToken, validatePassword, asyncHandler(userController.updatePasswordController));
router.get("/:id", validateToken, asyncHandler(userController.getDetailsController));


module.exports = router;