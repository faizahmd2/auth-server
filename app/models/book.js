import db from '../../connection/db.js';
const Schema = db.Schema;

const bookSchema = new Schema({
    title: String,
    author: String,
    summary: String,
    status: Schema.Types.Number,
    created: Schema.Types.Date,
    modified: { type: Date, default: Date.now }
});

const Book = db.model('Book', bookSchema);

export default Book;
