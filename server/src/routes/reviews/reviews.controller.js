const ReviewModel = require("../../models/reviews/reviews.model");

const ReviewsController = {
    getReviews: async function (req, res) {
        const user_id = req.headers.authorization;
        try {
            let func = null;
            func = ReviewModel.Review.find()
            
            let reviews = await func
                .populate({
                    path: "user",
                    model: "User",
                })
                // .populate({
                //     path: "replies",
                //     model: "Reply",
                //     populate: [
                //         {
                //             path: "user",
                //             model: "User",
                //         },
                //         {
                //             path: "replies",
                //             model: "Reply",
                //             populate: [
                //                 {
                //                     path: "user",
                //                     model: "User",
                //                 },
                //                 {
                //                     path: "replies",
                //                     model: "Reply"
                //                 }
                //             ]
                //         }
                //     ]
                // })
                // .lean()
                // .exec();

            // if (reply_id && reply_id !== "ALL") {
            //     messages = [messages];
            // }

            const _reviews = reviews.map(review => {
                if (review.deleted) {
                    return {
                        _id: review._id,
                        deleted: true,
                    }
                }
                // message.sign = findSign(message);
                return review;
            })
            res.status(200).json({ reviews: _reviews });
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Something went wrong" });
        }
    },
    createReview: async function (req, res) {
        const { user_id, content, score } = req.body;
        if (!user_id || !content || !score) {
            return res.status(400).json({ message: "Invalid request" });
        }
        try {
            const review = await ReviewModel.createReview(user_id, content, score);
            const populatedReview = await review.populate("user", "username image")
            res.status(201).json({ review: populatedReview });
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    deleteReview: async function (req, res) {
        const { review_id} = req.params;
        if (!review_id) {
            return res.status(400).json({ message: "Invalid request" });
        }

        try {
            async function deleteMe(_delete) {
                await _delete(review_id);
                res.status(200).json({ message: "Message deleted" });
            }
            deleteMe(Review.deleteReview)
        }
        catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    },

    editReview: async function (req, res) {
        const { review_id } = req.params;
        const { edited_content } = req.body;
        if (!review_id || !edited_content ) {
            return res.status(400).json({ message: "Invalid request" });
        }
        try {
            async function editMe(_edit) {
                const review = await _edit(review_id, edited_content);
                res.status(200).json({ review });
            }
            editMe(ReviewModel.editReview)
        }
        catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
        
    }
}

module.exports = ReviewsController;