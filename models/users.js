const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    email:{
        type: String, 
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
       type:String,
       required:true
    },
    question:{
         type: Number, 
         default: 0 
    },
    answer:{
        type: Number, 
        default: 0 
    },
    upvote:{
        type:Number, 
        default: 0 
    }
},{
    timestamps:true
});

const User=mongoose.model('User',userSchema);
module.exports=User;