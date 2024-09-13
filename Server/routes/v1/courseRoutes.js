const express = require("express");
const { createCourse, updateCourse, deleteCourse,getCourses,getCourseDetails } = require("../../controllers/courseController");
const { upload } = require("../../middlewares/multer");
const { mentorAuth } = require("../../middlewares/mentorAuth");

const router = express.Router();

router.get("/course-list", getCourses);

router.get("/details/:courseId", getCourseDetails);

router.post('/create',mentorAuth,upload.single('image'), createCourse)

router.put('/update/:id',mentorAuth,upload.single("image"),updateCourse)

router.delete('/delete/:id',mentorAuth,deleteCourse)


module.exports = {courserouter: router};

