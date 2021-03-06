const express=  require('express');
const cookieParser=require('cookie-parser');
const alert= require('alert');
const app=express();
const port=process.env.PORT || 3000;
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-stratagies');
const MongoStore = require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');
const newLocal = './assets/scss';
const flash= require('connect-flash');
const customMware=require('./config/middleware');
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
app.use(express.urlencoded({extended:true}));
app.use(express.static('./assets'));
app.use(cookieParser());
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'connectii',
    secret:'lets_connnect',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl:'mongodb+srv://shubham:shubham@cluster0.7tcob.mongodb.net/askuora?retryWrites=true&w=majority',
            autoRemove:'disabled',
    },(err)=>{
        console.log(err);
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash); 
app.use('/',require('./routes/index.js'));
app.listen(port,(err)=>{
    if(err)
    console.log(err);
    else
    console.log(`server is running on the port: ${port}`);
})