const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createProductReview = async ({ userID, productID, title, description, rating }) => {
    const review = await prisma.product_Review.create({
        data: {
            userID: userID,
            productID: productID,
            title: title,
            description: description,
            rating: rating
        },
    });

    return review;
};

const deleteProductReview = async (reviewID) => {
    const find = await findProductReview(reviewID);

    if(!find) return null;

    const deletedReview = await prisma.product_Review.delete({
        where: {reviewID: reviewID},
    });

    return deletedReview;
};

const findProductReview = async (reviewID) => {
    const review = await prisma.product_Review.findUnique({
        where: {reviewID: reviewID},
    });

    return review;
};

const findAllProductReviewByUser = async (userID) => {
    const reviewList = await prisma.product_Review.findMany({
        where: {userID: userID},
    });

    return reviewList;
};

const findAllProductReviewByProduct = async (productID) =>{
    const reviewList = await prisma.product_Review.findMany({
        where: {productID: productID},
    });

    return reviewList;
};


module.exports = {
    createProductReview,
    deleteProductReview,
    findProductReview,
    findAllProductReviewByUser,
    findAllProductReviewByProduct,
};