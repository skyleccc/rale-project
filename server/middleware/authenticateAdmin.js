const validateAdmin = async (req, res, next) => {
    try {
        if (req.user.role != "ADMIN") {
            return res.status(401).json({ message: "Access Denied. Anauthorized user." });
        }
        next();
    } catch (err) {
        return res.status(401).json({ error: "Internal server error." });
    }
}

module.exports = validateAdmin;