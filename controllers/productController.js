const productService = require("../services/productService");
const { handleValidationError } = require("../utils/errorUtils");

const addProductController = async (req, res) => {
    const { name, price, discount, category, imagePath, description = "No description provided." } = req.body;

    if (!name || !price) {
        return handleValidationError(res, 400, "Name and price are required");
    }

    const product = await productService.createProduct({ name, description, price, discount, category, imagePath });
    res.json(product);
};

const editProductController = async (req, res) => {
    const { name, description = "No description provided.", price, discount, category, imagePath } = req.body;
    const productID = parseInt(req.params.id, 10);

    if (!productID || !Number.isInteger(productID)) {
        return handleValidationError(res, 400, "Invalid product ID");
    }

    if (!name || !price) {
        return handleValidationError(res, 400, "Name and price are required");
    }

    const updatedProduct = await productService.updateProduct({ productID, name, description, price, discount, category, imagePath });

    if (!updatedProduct) {
        return handleValidationError(res, 404, "Product not found");
    }

    res.json(updatedProduct);
};

const deleteProductController = async (req, res) => {
    const productID = parseInt(req.params.id, 10);

    if (!productID || !Number.isInteger(productID)) {
        return handleValidationError(res, 400, "Invalid product ID");
    }


    const deletedProduct = await productService.deleteProduct(productID);

    if (!deletedProduct) {
        return handleValidationError(res, 404, "Product not found");
    }

    res.json(deletedProduct);
};

const getProductController = async (req, res) => {
    const productID = parseInt(req.params.id, 10);

    if (!productID || !Number.isInteger(productID)) {
        return handleValidationError(res, 400, "Invalid product ID");
    }

    const product = await productService.findProduct(productID);

    if (!product) {
        return handleValidationError(res, 404, "Product not found");
    }

    res.json(product);
};

const getAllProductsController = async (req, res) => {
    const productList = await productService.findAllProducts();
    res.json(productList);
};

module.exports = {
    addProductController,
    editProductController,
    deleteProductController,
    getProductController,
    getAllProductsController,
};
