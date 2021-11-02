const Like= require('../models/upvote'); 
const Comment= require('../models/comments'); 
  module.exports.toggle= async function(req,res){
   let to_remove=false;
   let like= await Like.findOne({'user':req.user._id,'likeable':req.query.id});
   if(like)
   {   
      let comment= await Comment.findByIdAndUpdate(req.query.id,{$pull:{likes:like._id}});
      like.remove();
      to_remove=true;
      return res.status(200).json({
            like_count:comment.likes.length-1,
            message:"Disliked the Post",
            comment:req.query.id
      });
   }
   else
   {
      let created_like=await Like.create({
          user:req.user._id,
          likeable:req.query.id
      });
      let comment= await Comment.findById(req.query.id);
      console.log(created_like._id);
      comment.likes.push(created_like._id);
      comment.save();
      return res.status(200).json({
         like_count:comment.likes.length,
         message:"Liked the Post",
         comment:comment._id
    });
   }
}