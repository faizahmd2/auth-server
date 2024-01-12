const mongoose = require('../connection/db')
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    book: Schema.Types.ObjectId,
    user: String,
    reviewText: String,
    rating: Number,
    status: Number,
    created: Date,
    modified: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
