const Review = require('../models/review')
const util = require('../utils/utils')

var controller = {
    addBookReviews: async function(req, res) {
        try {
            let { bookId, reviewText="", rating } = req.body
            let { email } = req.decode

            if(!bookId || !rating) throw { message: "Parameters Missing" }
            if(!util.isValidObjectId(bookId)) throw { message: "Invalid Book Id" }
            
            const review = new Review({ book: bookId, user: email, reviewText, rating, created: Date.now(), status: 1});
            let save = await review.save()
            return res.json({status: 1, message: "Review Saved"});
        } catch (error) {
            console.error(error);
            let mesg = 'Something Went Wrong !!!'
            if(error.message) mesg = error.message
            return res.json({status: 0, message: mesg});
        }
    },
    getBookReviews: async function(req, res) {
        try {
            let bookId = req.params.bookId

            if(!util.isValidObjectId(bookId)) throw { message: "Invalid Book Id" }
            
            let reviews = await Review.find({ book: bookId })
            return res.json({status: 1, reviews});
        } catch (error) {
            console.error(error);
            let mesg = 'Something Went Wrong !!!'
            if(error.message) mesg = error.message
            return res.json({status: 0, message: mesg});
        }
    }
}

module.exports = controller