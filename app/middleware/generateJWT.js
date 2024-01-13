const jwt = require('jsonwebtoken');
const config = require('../../config/config')

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

module.exports = generateJWT;