const express= require('express');
const User=require('../models/users');
const alert= require('alert');
module.exports.profile = function(req,res){
     return res.send('<h1>Working!!</h1>')
}
module.exports.signUp=function(req,res)
{
     return res.render('user_signup',{
          title:'sign up page'
     });
}
module.exports.signIn=function(req,res)
{
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
     User.findOne({email:req.body.email},(err,user)=>{
          if(err)
          {
               console.log('error in finding user from database while sign-in');
               return;
          }
          if(user)
          {      
               if(user.password!=req.body.password)
               { 
                 alert('password didnot matched');
                 setTimeout(function(){ 
                    res.redirect('back');
                 }, 3000);
                    return; 
               }
                  return res.redirect('/users/profile');
          }
          else
          {      
                 return res.redirect('back');
          }
     });
}

