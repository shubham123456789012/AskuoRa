const { populate } = require('../models/post');
const Post=require('../models/post');
const User= require('../models/users');
const comments=require('../models/comments');
const { post } = require('../routes');
module.exports.home = async function(req,res){
 try{
  let posts= await Post.find({})
  .populate('user')
  .populate({
    path:'comments',
    populate:{
       path: 'user'
    }
  });
 let user= await User.find({});
    return res.render('home.ejs',{
      title:'Connectii',
      posts:posts,
      all_user:user
   })
 }
 catch(err){
     console.log("error heppend in home_controller");
 }
}