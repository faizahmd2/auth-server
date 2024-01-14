import jwt from 'jsonwebtoken';
import config from '../../config/config.js'

export const verifyJwt = (token) => {
    const options = {
        expiresIn: config.get('JWT_EXPIRY'),
    };

    return jwt.verify(token, config.get('JWT_SECRET'), options);
}
