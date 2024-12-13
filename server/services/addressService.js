const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createAddress = async ({userID, street, city, zipCode, category, isPrimary }) => {
    const address = await prisma.address.create({
        data: {
            user: {
                connect: {
                    userID: userID,
                },
            },
            street: street,
            city: city,
            zipCode: zipCode,
            category: category,
            isPrimary: isPrimary,
        },
    });
    
    return address;
};

const updateAddress = async ({ addressID, userID, street, city, zipCode, category, isPrimary }) => {
    const find = await findAddress(addressID, userID);

    if(!find) return null;

    const updatedAddress = await prisma.address.update({
        where: { 
            addressID: addressID,
            userID: userID,
        },
        data: {
            street: street,
            city: city,
            zipCode: zipCode,
            category: category,
            isPrimary: isPrimary,
        },
    });

    return updatedAddress;
};

const deleteAddress = async ({addressID, userID}) => {
    const find = await findAddress(addressID, userID);
    
    if(!find) return null;

    const deletedAddress = await prisma.address.update({
        where: { 
            addressID: addressID,
            userID: userID,
        },
        data: {
            userID: null,
        },
    }); 

    return deletedAddress;
};

const findAddress = async (addressID, userID) => {
    const address = await prisma.address.findUnique({
        where: { 
            addressID: addressID,
            userID: userID,
        },
    });

    return address;
};

const getAllAddressByUser = async (userID) => {
    const addressList = await prisma.address.findMany({
        where: { userID: userID },
    });

    return addressList;
};

module.exports = {
    createAddress,
    updateAddress,
    deleteAddress,
    findAddress,
    getAllAddressByUser,
};
