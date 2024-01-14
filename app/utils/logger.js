import pino from 'pino';
import config from '../../config/config.js';
const loggingConf = config.get('logging') || {};

// log levels
const customLevels = {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10,
};

const logger = pino({
    transport: {
        target: 'pino-pretty'
    },
    colorize: true, 
    translateTime: 'yyyy-mm-dd HH:MM:ss',
    enabled: loggingConf.enabled,
    customLevels,
});

export default logger;
