const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createOrderItem = async ({ orderID, inventoryID, quantity, priceAtPurchase }) => {
    const orderItem = await prisma.order_Item.create({
        data:{
            order: {
                connect: {
                    orderID: orderID,
                },
            },
            inventory: {
                connect: {
                    inventoryID: inventoryID,
                },
            },
            quantity: quantity,
            priceAtPurchase: priceAtPurchase,
        },
    });

    return orderItem;
};

const updateOrderItem = async ({ itemID, quantity, priceAtPurchase }) => {
    const find = await findItem(itemID);

    if(!find) return null;

    const updatedOrderItem = await prisma.order_Item.update({
        where: {itemID: itemID},
        data: {
            quantity: quantity,
            priceAtPurchase: priceAtPurchase,
        },
    });

    return updatedOrderItem;
};

const deleteOrderItem = async (itemID) => {
    const find = await findItem(itemID);

    if(!find) return null;

    const deletedOrderItem = await prisma.order_Item.delete({
        where: {itemID: itemID},
    });

    return deletedOrderItem;
};

const findItem = async (itemID) => {
    const item = await prisma.order_Item.findUnique({
        where: {itemID: itemID},
    });

    return item;
};

const findItemsByInvID = async (inventoryID) => {
    const itemList = await prisma.order_Item.findMany({
        where: {inventoryID: inventoryID},
    });

    return itemList;
};

const findItemsByOrdID = async (orderID) => {
    const itemList = await prisma.order_Item.findMany({
        where: {orderID: orderID},
    });

    return itemList;
};

module.exports = {
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
    findItem,
    findItemsByInvID,
    findItemsByOrdID,
}