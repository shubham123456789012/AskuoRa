const User=require('../models/users');
const alert= require('alert');

module.exports.profile = function(req,res){    
     return res.render('profile');    
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
          return res.redirect('/users/profile');
     }
     return res.render('user_sign',{
          title:'sign in page'
     });
}
module.exports.create=function(req,res){
     if(req.body.password!=req.body.confirm_password)
     {   
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
                  console.log('user allready enrolled');
                      return res.redirect('back');
              }
              else
              {      
                     User.create(req.body);
                     return res.redirect('/users/sign-in');
              }
         });
     }
}
module.exports.login=function(req,res){
     return res.redirect('/');
}
module.exports.signout=function(req,res){
      req.logout();
     return res.redirect('/');
}
