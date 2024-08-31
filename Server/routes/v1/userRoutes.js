const express = require("express");
const { userSignup, userLogin, userLogout, userProfile, checkUser } = require("../../controllers/userControllers");
const { userAuth } = require("../../middlewares/userAuth");

const router = express.Router();
router.post('/signup',userSignup)

router.get('/userList');

router.get('/profile',userAuth ,userProfile);

// router.put('/update',userAuth,updateUser);

router.delete('/delete');

router.post('/login',userLogin);

router.post('/logout',userLogout);

router.get('/check-user', userAuth,checkUser);


module.exports = {userrouter: router};