const express = require("express");
const { mentorLogin, mentorSignup, mentorLogout, mentorProfile } = require("../../controllers/mentorController");
const { mentorAuth } = require("../../middlewares/mentorAuth");

const router = express.Router();
router.post('/signup',mentorSignup);

// router.get('/userList');

router.get('/profile', mentorAuth ,mentorProfile);

// router.put('/update',userAuth,updateUser);

// router.delete('/delete');

router.post('/login',mentorLogin);

router.post('/logout',mentorLogout);

// router.get('/check-user', userAuth,checkUser);


module.exports = {mentorrouter: router};