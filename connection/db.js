import mongoose from 'mongoose';
import logger from '../app/utils/logger.js';
import config from '../config/config.js';
let mongo_uri = config.get('mongo_uri');

mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  logger.error('MongoDB connection error:', err);
});

db.once('open', () => {
  logger.info('Connected to MongoDB');
});

export default mongoose;
