const mongoose = require('../connection/db')
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    author: String,
    summary: String,
    status: Schema.Types.Number,
    created: Schema.Types.Date,
    modified: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
