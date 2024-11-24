const orderService = require("../services/orderService");
const { handleValidationError } = require("../utils/errorUtils");

const addOrderController = async (req, res) => {
    const { shippingAmount = 0, isPaid = 0, addressID, dateOrdered = null, status = "Processing", dateArrived = null, paymentMethod} = req.body;
    const userID = req.user.id;

    if(!addressID || !Number.isInteger(addressID) || !userID || !Number.isInteger(userID)){
        return handleValidationError(res, 401, "Invalid address ID or user ID");
    }

    if(!paymentMethod){
        return handleValidationError(res, 400, "Payment method not filled");
    }

    const order = await orderService.createOrder({ userID, shippingAmount, isPaid, addressID, dateOrdered, status, dateArrived, paymentMethod});

    res.json(order);
}

module.exports = {
    addOrderController,
}