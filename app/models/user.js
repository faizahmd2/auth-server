const mongoose = require('../connection/db')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  status: Schema.Types.Number,
  created: Schema.Types.Date,
  modified: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
