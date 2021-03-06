// server requirements
var express = require('express');

// dependencies
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport=require("passport");
var flash=require("connect-flash");
var cors = require("cors");

// backend controllers, local
var dashboard = require('./routes/dashboard');
var login = require('./routes/login');
var register = require('./routes/register');
var search = require('./routes/search');
var userprofile = require('./routes/userprofile');
var posts = require('./routes/posts');
var updateUser= require('./routes/updateuser')
// initializing and configuring the Node/Express server
var app = express();
app.listen(3030,function(){
  console.log('app listnening on port 3030');
})
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
  // cookie: { secure: true }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// app.use(express.static('./public'));
// app.use(function(req,res,next){
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.setHeader('Access-Control-Allow-Methods','POST,GET,DELETE');
//     res.setHeader('Access-Control-Allow-Headers','X-Requested-With,json/application');
//     res.setHeader('Access-Control-Allow-Credentials',true);
//     next();
// })
app.use('/', login);
app.use('/register', register);
app.use('/dashboard', dashboard);
app.use('/search',search);
app.use('/userprofile',userprofile);
app.use('/post',posts);
app.use('/updateuser',updateUser);
// // passport config
// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());
// // app.get('*',function(req,res){
// 		res.redirect('/');
// 	})
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 6000000 }}));
// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
