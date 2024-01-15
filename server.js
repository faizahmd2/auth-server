import app from './connection/express.js';
import passport from 'passport';
import routesBackend from './routesBackend.js';
import routesClient from './routesClient.js';

// passport
app.use(passport.initialize());
import './connection/passport.js';

// connect mongoose
import './connection/db.js';

// Backend routes
routesBackend(app);

// Next app client route configure
routesClient(app);
