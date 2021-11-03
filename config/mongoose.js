const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://shubham:shubham@cluster0.7tcob.mongodb.net/askuora?retryWrites=true&w=majority');
const db=mongoose.connection;
//error
db.on('error',console.error.bind(console,'error while connecting'));
//up and running then print the message.
db.once('open',()=>{
     console.log('connection successfully');
})