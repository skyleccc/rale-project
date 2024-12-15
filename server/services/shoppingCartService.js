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
    const cartList = await prisma.shopping_Cart.findFirst({
        where: { userID: userID },
        include: {
            items: {
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

    return cartList;
};



module.exports = {
    createShoppingCart,
    findShoppingCartWithItems,
}