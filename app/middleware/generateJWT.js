const jwt = require('jsonwebtoken');

const options = {
  expiresIn: process.env.JWT_EXPIRY,
};

async function generateJWT(email) {
  try {
    const payload = { email };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
    return { error: false, token };
  } catch (error) {
    return { error: true };
  }
}

module.exports = generateJWT;