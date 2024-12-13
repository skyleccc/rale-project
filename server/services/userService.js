const { PrismaClient } = require("@prisma/client");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
};

const createUser = async ({ email, username, password, userFirstName, userLastName, phoneNumber }) => {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword,
                userFirstName: userFirstName,
                userLastName: userLastName,
                phoneNumber: phoneNumber,
            },
        });

    return user;
};

const updateUserDetails = async ({ id, email, username, userFirstName, userLastName, phoneNumber }) => {
    const find = await findUser(id);
    
    if(!find) return null;

    const updatedUser = await prisma.user.update({
        where: { userID: id },
        data: {
            email: email,
            username: username,
            userFirstName: userFirstName,
            userLastName: userLastName,
            phoneNumber: phoneNumber,
        },
    });

    return updatedUser;
};

const updateUserPassword = async ({ id, newPassword }) => {
    const find = await findUser(id);

    if(!find) return null;

    const hashedPassword = await hashPassword(newPassword);

    const updatedUser = await prisma.user.update({
        where: { userID: id },
        data: { password: hashedPassword },
    });
        
    return updatedUser;
};

const findUser = async (id) => {
    const user = await prisma.user.findUnique({
        select: {
            email: true,
            userFirstName: true,
            userLastName: true,
            phoneNumber: true,
            role: true,
        },
        where: { userID: id },
    });

    return user;
};

const loginUser = async (email) => {

    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if (!user) return null;
    
    const token = jsonwebtoken.sign(
        { id: user.userID, role: user.role },
        process.env.JWT_SECRET || "defaultSecret",
        { expiresIn: "24h" }
    );

    return token;
};

const checkUniqueUser = async ({email, username}) => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email: email },
                { username: username },
            ],
        },
    });

    return user;
}

module.exports = {
    createUser,
    updateUserDetails,
    updateUserPassword,
    findUser,
    loginUser,
    checkUniqueUser,
};
