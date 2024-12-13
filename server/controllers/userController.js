const userService = require("../services/userService");
const { handleValidationError } = require("../utils/errorUtils");

const checkExisting = async ({ email, username }) => {return await userService.checkUniqueUser({ email, username })};

const registerController = async (req, res) => {
    const { email, username, password, userFirstName, userLastName, phoneNumber } = req.body;

    if (!email || !username || !password || !userFirstName || !userLastName || !phoneNumber) {
        return handleValidationError(res, 400, "All fields are required");
    }

    const existingUser = await checkExisting({email, username});

    if (existingUser) {
        return handleValidationError(res, 409, "Email or Username already exists");
    }

    const user = await userService.createUser({ email, username, password, userFirstName, userLastName, phoneNumber });
    res.json(user);
};

const loginController = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return handleValidationError(res, 400, "Email is required");
    }

    const token = await userService.loginUser(email);

    if (!token) {
        return handleValidationError(res, 401, "Invalid email");
    }

    res.json({ token });
};

const updateDetailsController = async (req, res) => {
    const { email, username, userFirstName, userLastName, phoneNumber } = req.body;
    const userID = req.user.id;

    if (!userID || !Number.isInteger(userID)) {
        return handleValidationError(res, 401, "Invalid user ID");
    }

    if (!email || !username || !userFirstName || !userLastName || !phoneNumber) {
        return handleValidationError(res, 400, "All fields are required");
    }

    const existingUser = await checkExisting({email, username});

    if (existingUser) {
        return handleValidationError(res, 409, "Email or Username already exists");
    }

    const updatedUser = await userService.updateUserDetails({ userID, email, username, userFirstName, userLastName, phoneNumber });

    if (!updatedUser) {
        return handleValidationError(res, 404, "User not found");
    }

    res.json(updatedUser);
};

const updatePasswordController = async (req, res) => {
    const { newPassword } = req.body;
    const userID = parseInt(req.params.id, 10);

    if (!userID || !Number.isInteger(userID)) {
        return handleValidationError(res, 401, "Invalid user ID");
    }

    if (!newPassword) {
        return handleValidationError(res, 400, "New password cannot be empty");
    }
    
    const updatedUser = await userService.updateUserPassword({ userID, newPassword });

    if (!updatedUser) {
        return handleValidationError(res, 404, "User not found");
    }

    res.json(updatedUser);
};

const getDetailsController = async (req, res) => {
    const userID = parseInt(req.params.id, 10);

    if (!userID || !Number.isInteger(userID)) {
        return handleValidationError(res, 401, "Invalid user ID");
    }


    const user = await userService.findUser(userID);

    if (!user) {
        return handleValidationError(res, 404, "User not found");
    }

    res.json(user);
};

module.exports = {
    registerController,
    loginController,
    updateDetailsController,
    updatePasswordController,
    getDetailsController,
};
