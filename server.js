const express = require('express')
const dotenv = require('dotenv')
const loadRoutes = require('./app/utils/routeLoader')
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
dotenv.config();

let allowedOrigins = process.env.allowedOrigins;
allowedOrigins = allowedOrigins.split(",");

// connect mongoose
require('./app/connection/db');

const PORT = process.env.PORT || 2460

const app = express()

app.use(express.json());

// cors
app.use(cors({
  origin: function (origin, callback) {
    // Check if the request's origin is in the allowed origins list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy: Origin not allowed.'));
    }
  },
  credentials: true
}));

app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

loadRoutes(app, path.join(__dirname, 'app/routes'));

app.listen(PORT, () => console.log(`Express app is listening on PORT ${PORT}`));

