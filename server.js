const path = require('path');
const passport = require('passport');
// const rootDir = path.normalize(__dirname + '/..');
let config = require('./config/config');
const loadRoutes = require('./app/utils/routeLoader')

const app = require('./connection/express');
const logger = require('./app/utils/logger');

//passport
app.use(passport.initialize());
require('./connection/passport')

// connect mongoose
require('./connection/db');

const PORT = config.PORT || 2460

loadRoutes(app, path.join(__dirname, 'app/routes'));

app.listen(PORT, () => logger.info(`Express app is listening on PORT ${PORT}`));

