const express = require("express");
const { auth, my_review } = require("../../utils/auth");
const ReviewsController = require("./reviews.controller")

const reviewsRouter = express.Router();

reviewsRouter.get(
    // "/:review_id",
    "/",
    auth,
    ReviewsController.getReviews
)

reviewsRouter.post(
    "/",
    auth,
    ReviewsController.createReview
)

reviewsRouter.delete(
    "/:review_id",
    auth,
    my_review,
    ReviewsController.deleteReview
)

reviewsRouter.put(
    "/:review_id",
    auth,
    my_review,
    ReviewsController.editReview
)

module.exports = reviewsRouter;