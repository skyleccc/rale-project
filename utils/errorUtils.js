const handleValidationError = (res, code, message) => {
    res.status(code).json({ codeStatus: code, error: message});
};

module.exports = {
    handleValidationError,
};
