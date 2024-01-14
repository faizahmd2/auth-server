import db from '../../connection/db.js';
const Schema = db.Schema;

const reviewSchema = new Schema({
    book: Schema.Types.ObjectId,
    user: String,
    reviewText: String,
    rating: Number,
    status: Number,
    created: Date,
    modified: { type: Date, default: Date.now }
});

const Review = db.model('Review', reviewSchema);

export default Review;
