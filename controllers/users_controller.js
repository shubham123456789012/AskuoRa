const User=require('../models/users');
const alert= require('alert');

module.exports.profile = function(req,res){  
     User.findById(req.params.id,(err,user)=>{
          return res.render('profile',{
               profile_user:user
          }); 
     }) 
}
module.exports.signUp=function(req,res)
{
     return res.render('user_signup',{
          title:'sign up page'
     });
}
module.exports.signIn=function(req,res)
{    
     if(req.isAuthenticated())
     {   
          return res.redirect('/');
     }
     return res.render('user_sign',{
          title:'sign in page'
     });
}
module.exports.create=function(req,res){
     if(req.body.password!=req.body.confirm_password)
     {   
          req.flash("error","Password and Conform Password should be same");
          res.redirect('back');
     }
     else
     {
         User.findOne({email:req.body.email},(err,user)=>{
              if(err)
              {
                   console.log('error in finding user from database');
                   return;
              }
              if(user)
              {    
                   req.flash('error','User allready Enrolled');
                  console.log('User allready enrolled');
                      return res.redirect('back');
              }
              else
              {      
                     User.create(req.body);
                     req.flash("success","Account Created");
                     return res.redirect('/users/sign-in');
              }
         });
     }
}
module.exports.login=function(req,res){
     req.flash('success','successfully logged in!');
     return res.redirect('/');
}
module.exports.signout=function(req,res){
      req.logout();
     req.flash('success','successfully logged out!');
     return res.redirect('/');
}
