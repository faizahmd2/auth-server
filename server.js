import passport from 'passport';
import app from './connection/express.js';
import routesBackend from './routesBackend.js';

// passport
app.use(passport.initialize());
import './connection/passport.js';

// connect mongoose
import './connection/db.js';
import routesClient from './routesClient.js';

// Backend routes
routesBackend(app);

// Next app client route configure
routesClient(app);
