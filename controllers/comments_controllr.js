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
                  if(req.xhr)
                  {
                     return res.status(400).json({});
                  }
                  return res.redirect('back');
              }
              else
              {   
                post.comments.push(comment._id);
                post.save();
                  if(req.xhr){ 
                      res.status(200).json({
                        data:{
                            comment:comment,
                            post:post,
                            user:req.user
                        },
                        message:"Comment Added"
                      });
                      return;
                  }
                  req.flash('success','Comment added!');
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
           let post=  Post.findByIdAndUpdate(post_id,{ $pull:{comments:req.params.id}});
            if(req.xhr)
            { 
                return res.status(200).json({
                    comment:comment,
                    message:"Comment deleted"
                });
            }
            req.flash('success','Comment Deleted!');
        }
        else
        {
            return res.redirect('back');
        }
    });
}