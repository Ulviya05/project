const express = require("express");

const api = express.Router();

const reviewsRouter = require("./reviews/reviews.route");
const userRouter = require("./user/user.route");

api.use("/review", reviewsRouter);
api.use("/user", userRouter);

module.exports = api