var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var rp = require('request-promise');
var bluebird = require('bluebird');
var knex = require('./db/knex');
var pg = require('pg');
var cors = require('cors');
var util = require('util');
var jwt = require('jsonwebtoken');

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
require('dotenv').load();

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', routes);
app.use('/auth', auth);

// app.use(function(req, res, next) {
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//   if(token) {
//     jwt.verify(token, process.env.APP_SECRET, function(err, decoded) {
//       if(err) {
//         res.json({success: false, message: 'Failed to authenticate token.'});
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     return res.status(403).send({
//       success: false,
//       message: 'No token provided.',
//     })
//   }
// });

app.use('/users', users);


app.get('/*',(req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

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
