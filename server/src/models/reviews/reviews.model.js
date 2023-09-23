const mongoose = require("mongoose");
const { userSchema } = require("../users/users.model");

const reviewsSchema = new mongoose.Schema(
    {
        content: {
            type: String
        },
        score: {
            type: Number
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        deleted: {
            type: Boolean
        }
    },
    { timestamps: true }
)

const Review = mongoose.model("Review", reviewsSchema);

const createReview = async (user_id, content, score) => {
    const review = new Review({
        content,
        score,
        user: user_id,
        deleted: false
    })
    return await review.save();
}

const getAllReviews = async () => {
    return Review.find();
}

const getReviewById = async (id) => {
    return Review.findById(id);
}

const deleteReview = async (id) => {
    const review = await getReviewById(id);
    review.deleted = true;
    review.save();
    return review
}

const editReview = async (review_id, edited_content) => {
    const review = await getReviewById(message_id);
    console.log(review)
    review.content = edited_content;
    review.save();
    return review
}


module.exports = {
    Review,
    createReview,
    getAllReviews,
    getReviewById,
    deleteReview,
    editReview
}