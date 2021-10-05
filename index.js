const express= require('express');
const cookieParser= require('cookie-parser');
const mongoose= require('mongoose');
const alert= require('alert');
const db=require('./config/mongoose');
const app=express();
const port=3000;
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/',require('./routes/index.js'));
app.set('view engine','ejs');
app.set('views','./views');
app.listen(port,(err)=>{
    if(err)
    console.log(err);
    else
    console.log(`server is running on port: ${port}`);
})