var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Blog = require('./models/blog');
var cloudinary = require('cloudinary');
var nodemailer = require("nodemailer");
var app = express();

var routes = require('./routes/index');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized:  false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.post('/enviar', routes);


// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


//blog controller
app.post("/new", function(req, res) {
  var data = {
    title: req.body.title,
    descrip: req.body.descrip,
    blogg: req.body.blogg,
    datePost: req.body.datePost,
    imgBlogUrl: req.body.imgBlogUrl,
    autor: req.body.autor,
    imgAutorUrl: req.body.imgAutorUrl,
    linkFB: req.body.linkFB,
    linkTW: req.body.linkTW,
    linkGH: req.body.linkGH
  }
  var blog = new Blog(data);
  console.log(req.body);
  /*blog.save(function(err){
    
    res.render('blog/adminBlog', { user : req.user });
  });*/

});


mongoose.connect('mongodb://localhost/desertechdb');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
