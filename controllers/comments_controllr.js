const Comment=require('../models/comments');
const Post=require('../models/post');
module.exports.create=function(req,res){
     Post.findById(req.body.post,function(err,post){
       if(post)
       {
          Comment.create({
              content:req.body.content,
              post:req.body.post,
              user:req.user._id
          },function(err,comment){
              if(err)
              {
                  console.log('canot add the comment');
                  return;
              }
              else
              {   
                  console.log('comment added');
                  post.comments.push(comment);
                  post.save();
                  return res.redirect('back');
              }
          })
       }
       else
       {
          return res.redirect('back');
       }
     });
}