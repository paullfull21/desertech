var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user : req.user });
});


router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/adminBlog');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('blog/adminBlog');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}
router.post('/enviar', function(req, res) {
    // create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'paulfulll20@gmail.com',
            pass: 'awesome..1992..'
        }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: req.body.email, // sender address
        to: 'paulfulll20 <paulfulll20@gmail.com>', // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.message, // plaintext body
        
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
            res.render('error',{title: "Error al enviar el Mail"});
        }else{
            console.log('Message sent: ' + info.response);
            res.render('index');
        }
        

    });
});


module.exports = router;




