const { populate } = require('../models/post');
const Post=require('../models/post');
const { post } = require('../routes');
module.exports.home = function(req,res){
  Post.find({})
  .populate('user')
  .populate({
    path:'comments',
    populate:{
       path: 'user'
    }
  })
  .exec(function(err,posts){
    return res.render('home.ejs',{
        title:'Connectii',
        posts:posts
     })
  })  
}