const ReviewModel = require("../models/reviews/reviews.model");

module.exports = {
    
    auth: function (req, res, next) {
        if (!req.headers.authorization) {
            return res.status(403).json({ error: 'No credentials sent!' });
        }
        next();
    },
    my_review: function (req, res, next) {
        const { review_id } = req.params;
        const user_id = req.headers.authorization;

        if (!review_id) {
            return res.status(400).json({ message: "Invalid request" });
        }
        async function checkMyReview(get) {
            try {
                const review = await get(review_id);
                if (review) {
                    if (review.user.toString() === user_id) {
                        next();
                    }
                    else {
                        return res.status(403).json({ error: 'Unauthorized!' });
                    }
                }
                else {
                    return res.status(400).json({ message: "Invalid request" });
                }
            } catch (error) {
                return res.status(500).json({ message: "Something went wrong" });
            }
        }
        checkMyReview(ReviewModel.getReviewById)
        
    }
};