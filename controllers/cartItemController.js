const cartItemService = require("../services/cartItemService");
const { handleValidationError } = require("../utils/errorUtils");

const addCartItemController = async (req, res) => {
    const { cartID, inventoryID, quantity } = req.body;

    if (!cartID || !Number.isInteger(cartID) || !inventoryID || !Number.isInteger(inventoryID)) {
        return handleValidationError(res, 400, "Invalid cart ID or inventory ID");
    }

    if (!quantity || !Number.isInteger(quantity)) {
        return handleValidationError(res, 400, "Invalid quantity");
    }

    const item = await cartItemService.createCartItem({ cartID, inventoryID, quantity });

    res.json(item);
}

const editCartItemController = async (req, res) => {
    const { itemID, quantity } = req.body;

    if (!itemID || !Number.isInteger(itemID)) {
        return handleValidationError(res, 400, "Invalid cart ID");
    }

    if (!quantity || !Number.isInteger(quantity)) {
        return handleValidationError(res, 400, "Invalid quantity");
    }

    const updatedItem = await cartItemService.updateCartItem({ itemID, quantity });

    if(!updatedItem){
        return handleValidationError(res, 404, "Cart item not found")
    }

    res.json(updatedItem);
};

const deleteCartItemController = async (req, res) => {
    const {itemID} = req.body;

    if(!itemID || !Number.isInteger(itemID)){
        return handleValidationError(res, 400, "Invalid item ID");
    }

    const deletedItem = await cartItemService.deleteCartItem(itemID);

    if(!deletedItem){
        return handleValidationError(res, 404, "Item not found");
    }

    res.json(deletedItem);
};

const findCartItemController = async (req, res) => {
    const {itemID} = req.body;

    if(!itemID || !Number.isInteger(itemID)){
        return handleValidationError(res, 400, "Invalid item ID");
    }

    const item = await cartItemService.findCartItem(itemID);

    if(!item){
        return handleValidationError(res, 404, "Item not found");
    }

    res.json(item);
};

const findAllCartItemsByCartIDController = async (req, res) => {
    const {cartID} = req.body;

    if(!cartID || !Number.isInteger(cartID)){
        return handleValidationError(res, 400, "Invalid cart ID");
    }

    const itemList = await citemListService.findCartItem(cartID);

    res.json(itemList);
};


module.exports = {
    addCartItemController,
    editCartItemController,
    deleteCartItemController,
    findCartItemController,
    findAllCartItemsByCartIDController,
}