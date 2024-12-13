const orderItemService = require("../services/orderItemService");
const { handleValidationError } = require("../utils/errorUtils");

const addOrderItemController = async (req, res) => {
    const { orderID, inventoryID, quantity, priceAtPurchase } = req.body;


    if(!orderID || !Number.isInteger(orderID) || !inventoryID || !Number.isInteger(inventoryID)){
        return handleValidationError(res, 400, "Invalid order ID or inventory ID");
    }

    if(!quantity || !Number.isInteger(quantity) || !priceAtPurchase || !Number.isFinite(priceAtPurchase)){
        return handleValidationError(res, 400, "Invalid quantity or priceAtPurchase");
    }

    const orderItem = await orderItemService.createOrderItem({ orderID, inventoryID, quantity, priceAtPurchase });

    res.json(orderItem);
};

const editOrderItemController = async (req, res) => {
    const { quantity, priceAtPurchase } = req.body;
    const itemID = parseInt(req.params.id, 10);

    if(!itemID || !Number.isInteger(itemID)){
        return handleValidationError(res, 400, "Invalid item ID");
    }

    if(!quantity || !Number.isInteger(quantity) || !priceAtPurchase || !Number.isFinite(priceAtPurchase)){
        return handleValidationError(res, 400, "Invalid quantity or priceAtPurchase");
    }

    const editedOrderItem = await orderItemService.updateOrderItem({ itemID, quantity, priceAtPurchase});

    if (!editedOrderItem) {
        return handleValidationError(res, 404, "Item not found");
    }

    res.json(editedOrderItem);
};

const deleteOrderItemController = async (req, res) => {
    const itemID = parseInt(req.params.id, 10);
    
    if(!itemID || !Number.isInteger(itemID)){
        return handleValidationError(res, 400, "Invalid item ID");
    }

    const deletedOrderItem = await orderItemService.deleteOrderItem(itemID);

    if (!deletedOrderItem){
        return handleValidationError(res, 404, "Item not found");
    }

    res.json(deletedOrderItem);
};

const findItemController = async (req, res) => {
    const itemID = parseInt(req.params.id, 10);

    if(!itemID || !Number.isInteger(itemID)){
        return handleValidationError(res, 400, "Invalid item ID");
    }

    const orderItem = await orderItemService.findItem(itemID);

    res.json(orderItem);
}

const findItemsByInvIDController = async (req, res) => {
    const inventoryID = parseInt(req.params.id, 10);

    if(!inventoryID || !Number.isInteger(inventoryID)){
        return handleValidationError(res, 400, "Invalid item ID");
    }

    const orderItemList = await orderItemService.findItemsByInvID(inventoryID);

    res.json(orderItemList);
};

const findItemsByOrdIDController = async (req, res) => {
    const orderID = parseInt(req.params.id, 10);

    if(!orderID || !Number.isInteger(orderID)){
        return handleValidationError(res, 400, "Invalid item ID");
    }

    const orderItemList = await orderItemService.findItemsByOrdID(orderID);

    res.json(orderItemList);
};

module.exports = {
    addOrderItemController,
    editOrderItemController,
    deleteOrderItemController,
    findItemController,
    findItemsByInvIDController,
    findItemsByOrdIDController,
}