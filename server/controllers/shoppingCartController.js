const shoppingCartService = require("../services/shoppingCartService");
const { handleValidationError } = require("../utils/errorUtils");

const addShoppingCartController = async (req, res) => {
    const userID = req.user.id;

    if (!userID || !Number.isInteger(userID)){
        return handleValidationError(res, 401, "Invalid user ID");
    }

    const cart = shoppingCartService.createShoppingCart(userID);

    res.json(cart);
};

module.exports = {
    addShoppingCartController,
}