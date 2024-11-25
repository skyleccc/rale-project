const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createOrder = async ({userID, shippingAmount, isPaid, addressID, status, dateArrived = null, paymentMethod}) => {
    const order = await prisma.order.create({
        data: {
            user: {
                connect: {
                    userID: userID,
                },
            },
            shippingAmount: shippingAmount,
            isPaid: isPaid,
            address: {
                connect: {
                    addressID: addressID,
                }
            },
            dateArrived: dateArrived,
            status: status,
            paymentMethod: paymentMethod,
        },
    });

    return order;
};

const updateOrder = async ({ orderID, shippingAmount, isPaid, addressID, dateOrdered, status, dateArrived = null, paymentMethod }) => {
    const find = await findOrder(orderID);

    if(!find) return null;

    const updatedOrder = await prisma.order.update({
        where: {
            orderID: orderID,
        },
        data: {
            shippingAmount: shippingAmount,
            isPaid: isPaid,
            address: {
                connect: {
                    addressID: addressID,
                }
            },
            dateOrdered: dateOrdered,
            status: status,
            dateArrived: dateArrived,
            paymentMethod: paymentMethod,
        },
    });

    return updatedOrder;
};

const deleteOrder = async (orderID) => {
    const find = await findOrder(orderID);

    if(!find) return null;

    const deletedOrder = await prisma.order.delete({
        where: {
            orderID: orderID,
        }
    });

    return deletedOrder;
};

const findOrder = async (orderID) => {
    const order = await prisma.order.findUnique({
        where: { orderID: orderID },
    });

    return order;
};

const getAllOrdersByUser = async (userID) => {
    const orderList = await prisma.order.findMany({
        where: { userID: userID },
    });

    return orderList;
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    findOrder,
    getAllOrdersByUser,
}