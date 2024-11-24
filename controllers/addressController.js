const addressService = require("../services/addressService");
const { handleValidationError } = require("../utils/errorUtils");

const addAddressController = async (req, res) => {
    const { street, city, zipCode, category, isPrimary } = req.body;
    const userID = req.user.id;

    if (!street || !city || !zipCode || !category) {
        return handleValidationError(res, 400, "All fields are required");
    }

    const address = await addressService.createAddress({ userID, street, city, zipCode, category, isPrimary });
    res.json(address);

};

const editAddressController = async (req, res) => {
    const { street, city, zipCode, category, isPrimary } = req.body;
    const addressID = parseInt(req.params.id, 10);
    const userID = req.user.id;

    if (!addressID || !Number.isInteger(addressID) || !userID || !Number.isInteger(userID)) {
        return handleValidationError(res, 401, "Invalid address ID or user ID");
    }

    if (!street || !city || !zipCode || !category) {
        return handleValidationError(res, 400, "All fields are required");
    }

    const updatedAddress = await addressService.updateAddress({ addressID, userID, street, city, zipCode, category, isPrimary });

    if (!updatedAddress) {
        return handleValidationError(res, 404, "Address not found");
    }

    res.json(updatedAddress);
};

const deleteAddressController = async (req, res) => {
    const addressID = parseInt(req.params.id, 10);
    const userID = req.user.id;

    if (!addressID || !Number.isInteger(addressID) || !userID || !Number.isInteger(userID)) {
        return handleValidationError(res, 401, "Invalid address ID or user ID");
    }

    const deletedAddress = await addressService.deleteAddress({ addressID, userID });

    if (!deletedAddress) {
        return handleValidationError(res, 404, "Address not found");
    }

    res.json(deletedAddress);
};

const getAddressController = async (req, res) => {
    const addressID = parseInt(req.params.id, 10);

    if (!addressID || !Number.isInteger(addressID)) {
        return handleValidationError(res, 401, "Invalid address ID");
    }

    const address = await addressService.findAddress(addressID);

    if (!address) {
        return handleValidationError(res, 404, "Address not found");
    }

    res.json(address);
};

const getAllUserAddressesController = async (req, res) => {
    const userID = req.user.id;

    const addresses = await addressService.getAllAddressByUser(userID);
    res.json(addresses);
};

module.exports = {
    addAddressController,
    editAddressController,
    deleteAddressController,
    getAddressController,
    getAllUserAddressesController,
};
