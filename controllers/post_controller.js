const Post=require('../models/post');
const { post } = require('../routes/users');
const Comment= require('../models/comments');
const User= require('../models/users');
module.exports.create= async (req,res)=>{
    if(req.isAuthenticated())
    {   
        if(!req.body.content)
        {   
            req.flash('error',`Post can't be empty!`)
            return res.redirect('/');
        }
       
       let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        let user=await User.findById(req.user._id);
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post,
                    user:user
                },
                message:"post published!"
            })
            return;
        }
        req.flash('success','Post Published!')
        return res.redirect('back');
    }
    else
    {   
         if(req.xhr)
        return res.status(401).json({});
        else{
            return res.redirect('/users-sign-in');
        }
    }
}
module.exports.delete_post= async function(req,res){
    if(req.isAuthenticated())
    {
       let to_delete=req.query.id;
       let post=await Post.findById(to_delete)
       if(!post)
        {
            return res.redirect('/');
        }
        if(post.user.toString()!=req.user._id.toString())
        {   
            if(req.xhr)
            {
               return res.status(404).json({});
            }
            else
            {
                req.flash('error',`Hey! You can't delete that`)
                return res.redirect('/');
            }
        }
        else
        {
            post.remove();
            await Comment.deleteMany({post:to_delete});
            if(req.xhr){
                return res.status(200).json({
                    data:post._id,
                    message:"deleted"
                });
                return;
            }
            req.flash('success','Post deleted');
            return  res.redirect('back');
        }    
    }
    else
    {
      res.redirect('/users/sign-in');
    }
}