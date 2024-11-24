const bcrypt = require("bcrypt");
const { getUserPassword } = require("../services/authService");

const validatePassword = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const getPassDB = await getUserPassword(email);

        if(!getPassDB){
            return res.status(401).json({ error: "User not found." });
        }

        const match = await bcrypt.compare(password, getPassDB);

        if(!match){
            return res.status(401).json({ error: "Invalid password." });
        }

        next();
    } catch (err) {
        return res.status(401).json({ error: "Internal server error." });
    }
}

module.exports = validatePassword;