const { handleValidationError } = require('../utils/errorUtils');

const errorMiddleware = (err, req, res, next) => {
    // Log the error (optional, for debugging purposes)
    console.error(err);

    // Determine if the error has a status code and message
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected error occurred";

    // Use handleValidationError to send the error response
    handleValidationError(res, statusCode, message);
};

module.exports = errorMiddleware;