const express= require('express');
const passport=require('passport');
const router=express.Router();
const usersController=require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.get('/sign-up',passport.checkAuthentication1,usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);
router.post('/login',passport.authenticate(
    'local',{failureRedirect:'/users/sign-in'},
),usersController.login);
router.get('/sign-out',usersController.signout);
module.exports=router;