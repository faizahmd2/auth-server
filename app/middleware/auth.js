const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

var auth = {
    validateToken: async function (req, res, next) {
        const token = req.cookies.token;
        let result;

        if (!token) return res.status(401).json({ status: 0, message: "Cookies missing in request made" });

        const options = {
            expiresIn: process.env.JWT_EXPIRY,
        };

        try {
            result = jwt.verify(token, process.env.JWT_SECRET, options);

            req.decoded = result;

            next();
        } catch (error) {
            logger.error("catche error auth token valiation:",error);

            if (error.name === "TokenExpiredError") {
                return res.status(403).json({
                    status: 0,
                    message: "Token expired",
                });
            }

            return res.status(403).json({
                status: 0,
                message: "Authentication error",
            });
        }
    }
}

module.exports = auth