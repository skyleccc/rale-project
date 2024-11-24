const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createProduct = async ({ name, description, price, discount, category, imagePath }) => {
    const product = await prisma.product.create({
        data: { 
            name: name, 
            description: description, 
            price: price, 
            discount: discount, 
            category: category, 
            imagePath: imagePath 
        },
    });

    return product;
};

const findProduct = async (id) => {
    const product = await prisma.product.findUnique({
        where: { productID: id },
    });
    
    return product;
};

const updateProduct = async ({ id, name, description, price, discount, category, imagePath }) => {
    const find = await findProduct(id);

    if(!find) return null;

    const updatedProduct = await prisma.product.update({
        where: { productID: id },
        data: { 
            name: name, 
            description: description, 
            price: price, 
            discount: discount, 
            category: category, 
            imagePath, imagePath 
        },
    });

    return updatedProduct;
};

const deleteProduct = async (id) => {
    const find = await findProduct(id);

    if(!find) return null;

    const deletedProduct = await prisma.product.delete({
        where: { productID: id },
    });
    
    return deletedProduct;
};

const findAllProducts = async () => {
    const productList = await prisma.product.findMany();
    
    return productList;
};

module.exports = {
    createProduct,
    findProduct,
    updateProduct,
    deleteProduct,
    findAllProducts,
};
