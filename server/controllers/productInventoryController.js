const productInventoryService = require("../services/productInventoryService");
const { handleValidationError } = require("../utils/errorUtils");

const addProductToInventoryController = async (req, res) => {
    const { productID, sizeID, productQuantity } = req.body;

    if (!productID || !Number.isInteger(productID) || !sizeID || !Number.isInteger(sizeID)) {
        return handleValidationError(res, 400, "Invalid product ID or size ID");
    }

    if (!productQuantity || !Number.isInteger(productQuantity)) {
        return handleValidationError(res, 400, "Quantity is invalid");
    }

    const product = await productInventoryService.addProductToInventory({ productID, sizeID, productQuantity });

    res.json(product);
};

const editQuantityController = async (req, res) => {
    const { inventoryID, productQuantity } = req.body;

    if (!inventoryID || !Number.isInteger(inventoryID)) {
        return handleValidationError(res, 400, "Invalid inventory ID");
    }

    if (!productQuantity || !Number.isInteger(productQuantity)) {
        return handleValidationError(res, 400, "Quantity is invalid");
    }

    const updatedProduct = await productInventoryService.editQuantity({ inventoryID, productQuantity });

    if(!updatedProduct){
        return handleValidationError(res, 404, "Inventory product not found");
    }

    res.json(updatedProduct);
};

const deleteProductFromInventoryController = async (req, res) => {
    const { inventoryID } = req.body;

    if (!inventoryID || !Number.isInteger(inventoryID)) {
        return handleValidationError(res, 400, "Invalid inventory ID");
    }

    const deletedProduct = await productInventoryService.deleteProductFromInventory(inventoryID);

    if(!deletedProduct){
        return handleValidationError(res, 404, "Inventory product not found");
    }

    res.json(deletedProduct);
};

const findProductController = async (req, res) => {
    const { inventoryID } = req.body;

    if (!inventoryID || !Number.isInteger(inventoryID)) {
        return handleValidationError(res, 400, "Invalid inventory ID");
    }

    const product = await productInventoryService.findProduct(inventoryID);

    if(!product){
        return handleValidationError(res, 404, "Inventory product not found");
    }

    res.json(product);
};

const getAllProductInInventoryController = async (req, res) => {
    const productList = await productInventoryService.getAllProductInInventory();

    res.json(productList);
};

module.exports = {
    addProductToInventoryController,
    editQuantityController,
    deleteProductFromInventoryController,
    findProductController,
    getAllProductInInventoryController,
}