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