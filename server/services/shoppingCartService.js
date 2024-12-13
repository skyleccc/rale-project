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

const findShoppingCartWithItems = async (userID) => {
    const cart = await prisma.shopping_Cart.findMany({
        where: { userID: userID },
        include: {
            cart_Items: {
                include: {
                    inventory: {
                        include: {
                            product: true,
                            size: true,
                        },
                    },
                },
            },
        }
    });

    return cart;
};



module.exports = {
    createShoppingCart,
    findShoppingCartWithItems,
}