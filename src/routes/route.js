const express = require('express');
const router = express.Router();
const { authentication,authorization } = require("../middleware/auth");
const { userLogin, followUser, unfollowUser } = require('../controllers/userController');
const { postTweet, getNewsFeed } = require('../controllers/tweetController');


//==Login User
router.post('/login', userLogin);

//==Follow User
router.post('/follow', authentication, authorization, followUser);

//==Unfollow User
router.post('/unfollow', authentication, authorization, unfollowUser);

//==Post Tweet
router.post('/postTweet/:userId', authentication, authorization, postTweet);

//==Get Tweets
router.post('/getNewsFeed',authentication, getNewsFeed);


//**********************************************************************

module.exports = router  

//*******************************************************************//