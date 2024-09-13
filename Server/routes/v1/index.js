const express = require("express");
const { userrouter } = require("./userRoutes");
const { courserouter } = require("./courseRoutes");
const { mentorrouter } = require("./mentorRoute");
const { cartRouter } = require("./cartRoutes");
const { reviewRouter } = require("./reviewRoutes");

const v1Router=express.Router();

v1Router.use('/user',userrouter)


v1Router.use('/mentor',mentorrouter)

v1Router.use('/course',courserouter)

v1Router.use('/cart',cartRouter)

v1Router.use("/review", reviewRouter);

module.exports = {v1Router};