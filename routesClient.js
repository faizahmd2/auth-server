import next from 'next';
import config from './config/config.js';
import logger from './app/utils/logger.js';

const dev = config.get('NODE_ENV') !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const PORT = config.get('PORT') || 2460

const nextRouter = (app) => {
    nextApp.prepare().then(() => {
        app.all('*', async (req, res) => {
            return handle(req, res);
        });

        // Start the combined server
        app.listen(PORT, (err) => {
          if (err) throw err;
          logger.info(`Server is running on http://localhost:${PORT}`);
        });
    });
}

export default nextRouter;
