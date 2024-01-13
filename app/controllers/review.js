const Review = require('../models/review')
const { serverError } = require('../utils/constants')
const logger = require('../utils/logger')
const util = require('../utils/utils')

var controller = {
    addBookReviews: async function(req, res) {
        try {
            let { bookId, reviewText="", rating } = req.body
            let { email } = req.decode

            if(!bookId || !rating) return res.json({status: 0, message: "Parameters Missing"});
            if(!util.isValidObjectId(bookId)) return res.json({status: 0, message: "Invalid Book Id"});
            
            const review = new Review({ book: bookId, user: email, reviewText, rating, created: Date.now(), status: 1});
            await review.save()
            return res.json({status: 1, message: "Review Saved"});
        } catch (error) {
            logger.error("CATCHED error adding book review",error);
            return res.json({error: serverError});
        }
    },
    getBookReviews: async function(req, res) {
        try {
            let bookId = req.params.bookId

            if(!util.isValidObjectId(bookId)) throw { message: "Invalid Book Id" }
            
            let reviews = await Review.find({ book: bookId })
            return res.json({status: 1, reviews});
        } catch (error) {
            logger.error("CATCHED error getting book review",error);
            return res.json({error: serverError});
        }
    }
}

module.exports = controller