const express= require('express');
const router=express.Router();
const postController=require('../controllers/post_controller');
router.post('/create',postController.create);
router.get('/Delete',postController.delete_post);
module.exports=router;