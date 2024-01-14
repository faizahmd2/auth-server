import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

const options = {
  expiresIn: config.get("JWT_EXPIRY"),
};

async function generateJWT(tokenData) {
  try {
    const token = await jwt.sign(tokenData, config.get("JWT_SECRET"), options);
    return { error: false, token };
  } catch (error) {
    return { error: true };
  }
}

export default generateJWT;