const sizeService = require("../services/sizeService");
const { handleValidationError } = require("../utils/errorUtils");

const addSizeController = async (req, res) => {
    const { name } = req.body;

    if(!name) {
        return handleValidationError(res, 400, "Name is required")
    }

    const size = await sizeService.addSize(name);

    res.json(size);
}

const editSizeController = async (req, res) => {
    const { name } = req.body;
    const sizeID = parseInt(req.params.id, 10);

    if (!sizeID || !Number.isInteger(sizeID)){
        return handleValidationError(res, 400, "Invalid size ID");
    }

    if (!name){
        return handleValidationError(res, 400, "Name is required");
    }

    const updatedSize = await sizeService.editSize({ sizeID, name });

    if (!updatedSize) {
        return handleValidationError(res, 404, "Size not found");
    }

    res.json(updatedSize);
}

const deleteSizeController = async (req, res) => {
    const sizeID = parseInt(req.params.id, 10);

    if (!sizeID || !Number.isInteger(sizeID)){
        return handleValidationError(res, 400, "Invalid size ID");
    }

    const deletedSize = await sizeService.deleteSize(sizeID);

    if (!deletedSize) {
        return handleValidationError(res, 404, "Size not found");
    }

    res.json(deletedSize);
}

const findSizeController = async (req, res) => {
    const sizeID = parseInt(req.params.id, 10);

    if (!sizeID || !Number.isInteger(sizeID)){
        return handleValidationError(res, 400, "Invalid size ID");
    }

    const size = await sizeService.findSize(sizeID);

    if (!size) {
        return handleValidationError(res, 404, "Size not found");
    }

    res.json(size);
}

const getAllSizesController = async (req, res) => {
    const sizeList = await sizeService.getAllSizes();

    res.json(sizeList);
}

module.exports = {
    addSizeController,
    editSizeController,
    deleteSizeController,
    findSizeController,
    getAllSizesController,
}
