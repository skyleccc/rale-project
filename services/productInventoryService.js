const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addProductToInventory = async ({ productID, sizeID, productQuantity }) => {
    const product = await prisma.product_Inventory.create({
        data: {
            product: {
                connect: {
                    productID: productID,
                },
            },
            size: {
                connect: {
                    sizeID: sizeID,
                }
            },
            productQuantity: productQuantity,
        },
    });

    return product;
};

const editQuantity = async ({ inventoryID, productQuantity }) => {
    const find = await findProduct(inventoryID);

    if (!find) return null;

    const updatedProduct = await prisma.product_Inventory.update({
        where: {inventoryID: inventoryID},
        data: {productQuantity: productQuantity},
    });

    return updatedProduct;
};

const deleteProductFromInventory = async (inventoryID) => {
    const find = await findProduct(inventoryID);

    if(!find) return null;

    const deletedProduct = await prisma.product_Inventory.delete({
        where: {inventoryID: inventoryID},
    });

    return deletedProduct;
}

const findProduct = async (inventoryID) => {
    const product = await prisma.product_Inventory.findUnique({
        where: {inventoryID: inventoryID},
    });

    return product;
}

const getAllProductInInventory = async () => {
    const productList = await prisma.product_Inventory.findMany();

    return productList; 
}

module.exports = {
    addProductToInventory,
    editQuantity,
    deleteProductFromInventory,
    findProduct,
    getAllProductInInventory,
}