const express= require('express');
const homeController=require('./controllers/home_controller');
const app=express();
const port=3000;

app.use('/',require('./routes/index.js'));
app.get('/',homeController.home);
app.listen(port,(err)=>{
    if(err)
    console.log(err);
    else
    console.log(`server is running on port: ${port}`);
})