const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const addSize = async (name) => {
    const size = await prisma.size.create({
        data: {
            name: name,
        },
    });

    return size;
};

const editSize = async ({ sizeID, name }) => {
    const updatedSize = await prisma.size.update({
       where: {sizeID: sizeID},
       data: {name: name},
    });

    return updatedSize;
};

const deleteSize = async (sizeID) => {
    const find = await findSize(sizeID);

    if(!find) return null;

    const deletedSize = await prisma.size.delete({
        where: {sizeID: sizeID},
    });

    return deletedSize;
};

const findSize = async (sizeID) => {
    const size = await prisma.size.findUnique({
        where: {sizeID: sizeID,},
    });

    return size;
};

const getAllSizes = async () => {
    const sizeList = await prisma.size.findMany();

    return sizeList;
}

module.exports = {
    addSize,
    editSize,
    deleteSize,
    findSize,
    getAllSizes,
}