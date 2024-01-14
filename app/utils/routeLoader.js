// Inside a utility function or right in server.js
import fs from 'fs/promises';  // Using fs.promises for asynchronous operations
import path from 'path';

const loadRoutes = async (app, routeDir) => {
    const files = await fs.readdir(routeDir);

    for (const file of files) {
        const route = require(path.join(routeDir, file));
        app.use(route);
    }
};

export default loadRoutes;
