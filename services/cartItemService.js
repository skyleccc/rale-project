const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient;

const createCartItem = async ({ cartID, inventoryID, quantity }) => {
    const item = await prisma.cart_Item.create({
        data: {
            cart: {
                connect:{
                    cartID: cartID,
                },
            },
            inventory: {
                connect: {
                    inventoryID: inventoryID,
                },
            },
            quantity: quantity,
        },
    });

    return item;
};

const updateCartItem = async ({ itemID, quantity }) => {
    const find = await findCartItem(itemID);

    if(!find) return null;

    const updatedItem = await prisma.cart_Item.update({
        where: {itemID: itemID},
        data: {quantity: quantity,},
    });

    return updatedItem;
};

const deleteCartItem = async (itemID) => {
    const find = await findCartItem(itemID);

    if (!find) return null;

    const deletedItem = await prisma.cart_Item.delete({
        where: {itemID: itemID},
    });

    return deletedItem;
};

const findCartItem = async (itemID) => {
    const item = await prisma.cart_Item.findUnique({
        where: {itemID: itemID},
    });

    return item;
};

const findAllCartItemsByCartID = async (cartID) => {
    const itemList = await prisma.cart_Item.findMany({
        where: {cartID: cartID},
    });

    return itemList;
};

module.exports = {
    createCartItem,
    updateCartItem,
    deleteCartItem,
    findCartItem,
    findAllCartItemsByCartID,
}

