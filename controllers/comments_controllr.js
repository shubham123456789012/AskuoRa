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
                  req.flash('success','Comment added!');
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

module.exports.destroy= function(req,res){
    Comment.findById(req.params.id,(err,comment)=>{
        if(!comment)
        {
            return res.redirect('/');
        }
        else if(comment.user==req.user.id)
        {   
            let post_id=comment.post;
            comment.remove();
            req.flash('success','Comment Deleted!');
            Post.findByIdAndUpdate(post_id,{ $pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })
        }
        else
        {
            return res.redirect('back');
        }
    });
}