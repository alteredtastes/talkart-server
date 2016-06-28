var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var bcrypt = require('bcrypt');
var passport = require('passport');
var cors = require('cors');

var app = express();
app.use(cors());

router.get('/instagram',
  passport.authenticate('instagram'),
  function(req, res, next) {

});

router.get('/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/login');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
