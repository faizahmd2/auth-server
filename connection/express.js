const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const config = require('../config/config');

let allowedOrigins = config.get('allowedOrigins');
const isProduction = config.get('NODE_ENV') === "production";

const app = express()

app.use(express.json());

// cors
app.use(cors({
  origin: function (origin, callback) {
    // Check if the request's origin is in the allowed origins list
    if (isProduction && allowedOrigins.indexOf(origin) !== -1) {
      callback(new Error('CORS policy: Origin not allowed.'));
    } else {
      callback(null, true);
    }
  },
  credentials: isProduction ? true : false
}));

app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

module.exports = app;