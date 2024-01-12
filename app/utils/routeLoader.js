// Inside a utility function or right in server.js
const fs = require('fs');
const path = require('path');

function loadRoutes(app, routeDir) {
    fs.readdirSync(routeDir).forEach(file => {
        // const routeName = file.split('.')[0]; // Extracts 'user' from 'userRoutes.js'
        const route = require(path.join(routeDir, file));
        app.use(route);
    });
}

module.exports = loadRoutes
