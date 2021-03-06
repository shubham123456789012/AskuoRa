const express= require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');
console.log("Router loaded");
router.get('/',homeController.home);
router.use('/users',require('./users.js'));
router.use('/post',require('./post'));
router.use('/comments',require('./comment'));
router.use('/like',require('./like'));
module.exports=router;