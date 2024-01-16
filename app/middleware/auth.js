import { verifyJwt } from './verifyJWT.js';

var auth = {
    validateToken: async function (req, res, next) {
        const token = req.cookies.token;

        if (!token) return res.status(401).json({ status: 0, message: "Cookies missing in request made" });

        try {

            let result = verifyJwt(token);

            req.user = result;

            next();
        } catch (error) {
            console.log("catche error auth token valiation:",error);

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

export default auth