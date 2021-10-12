const Post=require('../models/post');
const { post } = require('../routes/users');
module.exports.create=(req,res)=>{
    if(req.isAuthenticated())
    {   
        if(!req.body.content)
        {
            return res.redirect('/');
        }
        Post.create({
            content:req.body.content,
            user:req.user._id
        },(err,post)=>{
            if(err)
            {
                console.log('error while creating the post');
                return;
            }
            else
            {
                return res.redirect('back');
            }
        })
    }
    else
    {
        return res.redirect('/users/sign-in');
    }
  
}
module.exports.delete_post=function(req,res){
    if(req.isAuthenticated())
    {
    let to_delete=req.query.id;
    Post.findById(to_delete,(err,post)=>
    {
        if(err)
        {
            console.log('error while finding the id of the post Id')
        }
        else{
            if(post.user.toString()!=req.user._id.toString())
            {
               return res.redirect('/');
            }
            else
            {
                Post.findByIdAndDelete(to_delete,(err)=>{
                    if(err)
                    {
                        console.log('Error While Deleting the post');
                        return;
                    }
                    else
                    {
                       res.redirect('back');
                    }  
                });
            }
        }
    });
    
  }
  else
  {
      res.redirect('/users/sign-in');
  }
}