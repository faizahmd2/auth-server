const mongoose = require('mongoose');
const logger = require('../app/utils/logger');
let mongo_uri = require('../config/config').get('mongo_uri');

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

module.exports = mongoose;
