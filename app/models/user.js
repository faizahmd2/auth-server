import db from '../../connection/db.js';
const Schema = db.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  provider: String,
  providerId: String,
  type: Schema.Types.Number,
  role: Schema.Types.String,
  status: Schema.Types.Number,
  created: Schema.Types.Date,
  modified: { type: Date, default: Date.now }
});

const User = db.model('users', userSchema);

export default User;
