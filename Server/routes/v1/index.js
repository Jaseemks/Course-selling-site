const express = require("express");
const { userrouter } = require("./userRoutes");
const { courserouter } = require("./courseRoutes");
const { mentorrouter } = require("./mentorRoute");

const v1Router=express.Router();

v1Router.use('/user',userrouter)


v1Router.use('/mentor',mentorrouter)

v1Router.use('/course',courserouter)



module.exports = {v1Router};