const orderService = require("../services/orderService");
const { handleValidationError } = require("../utils/errorUtils");

const addOrderController = async (req, res) => {
    const { shippingAmount = 0, isPaid = 0, addressID, status = "Processing", dateArrived = null, paymentMethod} = req.body;
    const userID = req.user.id;

    if(!addressID || !Number.isInteger(addressID) || !userID || !Number.isInteger(userID)){
        return handleValidationError(res, 401, "Invalid address ID or user ID");
    }

    if(!paymentMethod){
        return handleValidationError(res, 400, "Payment method not filled");
    }

    const order = await orderService.createOrder({ userID, shippingAmount, isPaid, addressID, status, dateArrived, paymentMethod});

    res.json(order);
};

const editOrderController = async (req, res) => {
    const {shippingAmount, isPaid, addressID, dateOrdered, status, dateArrived, paymentMethod} = req.body;
    const orderID = parseInt(req.params.id, 10);

    if(!addressID || !Number.isInteger(addressID)){
        return handleValidationError(res, 401, "Invalid address ID");
    }

    if(!paymentMethod || !shippingAmount || !dateOrdered || !status){
        return handleValidationError(res, 400, "All fields must be filled");
    }

    const updatedOrder = await orderService.updateOrder({ orderID, shippingAmount, isPaid, addressID, dateOrdered, status, dateArrived, paymentMethod });

    if(!updatedOrder){
        return handleValidationError(res, 404, "Order not found");
    }

    res.json(updatedOrder);
};

const deleteOrderController = async (req, res) => {
    const orderID = parseInt(req.params.id, 10);

    if(!orderID || !Number.isInteger(orderID)){
        return handleValidationError(res, 401, "Invalid order ID");
    }

    const deletedOrder = await orderService.deleteOrder(orderID);

    if(!deletedOrder){
        return handleValidationError(res, 404, "Order not found");
    }

    res.json(deletedOrder);
};

const findOrderController = async (req, res) => {
    const orderID = parseInt(req.params.id, 10);

    if(!orderID || !Number.isInteger(orderID)){
        return handleValidationError(res, 401, "Invalid order ID");
    }

    const order = await orderService.findOrder(orderID);

    if(!order){
        return handleValidationError(res, 404, "Order not found");
    }

    res.json(order);
};

const getAllOrdersByUserController = async (req, res) => {
    const userID = req.body.id;

    if(!userID || !Number.isInteger(userID)){
        return handleValidationError(res, 401, "Invalid user ID");
    }

    const orderList = await orderService.getAllOrdersByUser(userID);

    res.json(orderList);
}
module.exports = {
    addOrderController,
    deleteOrderController,
    editOrderController,
    findOrderController,
    getAllOrdersByUserController,
}