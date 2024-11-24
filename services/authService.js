const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUserPassword = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    
    return user ? user.password : null;
}

module.exports = {
    getUserPassword,
};