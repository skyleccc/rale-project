const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createShoppingCart = async (userID) => {
    const cart = await prisma.shopping_Cart.create({
        data: {
            user: {
                connect: {
                    userID: userID,
                },
            },
        },
    });

    return cart;
};

module.exports = {
    createShoppingCart,
}