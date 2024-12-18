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

const updateUserDetails = async ({ userID, email, username, userFirstName, userLastName, phoneNumber }) => {
    const find = await findUser(userID);
    
    if(!find) return null;

    const updatedUser = await prisma.user.update({
        where: { userID: userID },
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

const updateUserPassword = async ({ userID, newPassword }) => {
    const find = await findUser(userID);

    if(!find) return null;

    const hashedPassword = await hashPassword(newPassword);

    const updatedUser = await prisma.user.update({
        where: { userID: userID },
        data: { password: hashedPassword },
    });
        
    return updatedUser;
};

const findUser = async (id) => {
    const user = await prisma.user.findUnique({
        select: {
            userID: true,
            email: true,
            userFirstName: true,
            userLastName: true,
            username: true,
            phoneNumber: true,
            addresses: true,
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

    // Return both the token and userId
    return { token, userId: user.userID };
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
