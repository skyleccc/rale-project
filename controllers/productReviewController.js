const productReviewService = require("../services/productReviewService");
const { handleValidationError } = require("../utils/errorUtils");

const addProductReviewController = async (req, res) => {
    const { productID, title, description, rating } = req.body;
    const userID = req.user.id;

    if (!productID || !Number.isInteger(productID)){
        return handleValidationError(res, 400, "Invalid product ID");
    }

    if (!title || !description || !rating){
        return handleValidationError(res, 400, "All fields must be filled up");
    }

    const review = await productReviewService.createProductReview({ userID, productID, title, description, rating });

    res.json(review);
};

const deleteProductReviewController = async (req, res) => {
    const {reviewID} = req.body;

    if (!reviewID || !Number.isInteger(reviewID)){
        return handleValidationError(res, 400, "Invalid review ID");
    }

    const deletedReview = await productReviewService.deleteProductReview(reviewID);

    if (!deletedReview) {
        return handleValidationError(res, 404, "Review not found");
    }

    res.json(deletedReview);
};

const findProductReviewController = async (req, res) => {
    const {reviewID} = req.body;

    if (!reviewID || !Number.isInteger(reviewID)){
        return handleValidationError(res, 400, "Invalid review ID");
    }

    const review = await productReviewService.findProductReview(reviewID);

    if (!review) {
        return handleValidationError(res, 404, "Review not found");
    }

    res.json(review);
};

const findAllProductReviewByProductController = async (req, res) => {
    const {productID} = req.body;

    if (!productID || !Number.isInteger(productID)){
        return handleValidationError(res, 400, "Invalid product ID");
    }

    const reviewList = await productReviewService.findAllProductReviewByUser(productID);

    res.json(reviewList);
};

const findAllProductReviewByUserController = async (req, res) => {
    const userID = req.user.id;

    if (!userID || !Number.isInteger(userID)){
        return handleValidationError(res, 401, "Invalid user ID");
    }

    const reviewList = await productReviewService.findAllProductReviewByUser(userID);

    res.json(reviewList);
};

module.exports = {
    addProductReviewController,
    deleteProductReviewController,
    findProductReviewController,
    findAllProductReviewByProductController,
    findAllProductReviewByUserController,
}