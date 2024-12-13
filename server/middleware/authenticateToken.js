const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const secretKey = process.env.JWT_SECRET || "defaultSecret"; 
        req.user = jwt.verify(token, secretKey); 
        next(); 
    } catch (error) {
        console.error("Token validation error:", error.message);
        res.status(403).json({ message: "Invalid or expired token." });
    }
};

module.exports = validateToken;
