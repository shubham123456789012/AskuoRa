const mongoose= require('mongoose');

const likeSchema= new mongoose.Schema({
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    // include the id of all commnent
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]
},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;