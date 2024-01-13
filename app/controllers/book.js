const Book = require('../models/book');
const logger = require('../utils/logger');
const { serverError } = require('../utils/constants');

var controller = {
    searchBooks: async function(req, res) {
        try {
            let search = req.query.search || null;
            let page = req.query.page ? +req.query.page : 1
            let pageSize = req.query.pageSize ? +req.query.pageSize : 10

            // Fetch Condition
            const regex = new RegExp(search, 'i');
            let searchPara = { }
            if(search) {
                searchPara.$or = [
                    { title: { $regex: regex } },
                    { author: { $regex: regex } },
                    { summary: { $regex: regex } }
                ]
            }
            if(req.query.genre) {
                searchPara.genre = req.query.genre
            }

            // Get total count
            const totalCount = await Book.countDocuments(searchPara);
            const totalPages = Math.ceil(totalCount / pageSize);
            
            // columns to be fetched
            let projections = {
                _id: 0,
                bookId: "$_id",
                title: "$title",
                author: "$author",
                summary: "$summary",
                genre: "$genre"
            }

            const skip = (page - 1) * pageSize;
            let mod = Book.find(searchPara, projections).skip(skip)

            if(req.query.pageSize && !isNaN(req.query.pageSize)) {
                mod.limit(+req.query.pageSize)
            }
            
            if(req.query.sortBy && (req.query.sortOrder ? (req.query.sortOrder == "1" || req.query.sortOrder == "-1") : true)) {
                let k = { [req.query.sortBy]: req.query.sortOrder ? +req.query.sortOrder : 1 }
                mod.sort(k)
            }

            let books = await mod

            let headers = Object.keys(projections).filter(e => e != '_id' && e != 'bookId').map(e => ({
                label: e.charAt(0).toUpperCase() + e.slice(1),
                key: e
            }))

            return res.json({status: 1, headers, rows: books, totalPages, page, totalCount, pageSize})
        } catch (error) {
            logger.error("CATCHED err search books",error);
            return res.status(500).json({error: serverError});
        }
    }
}

module.exports = controller