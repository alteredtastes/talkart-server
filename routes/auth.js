var express = require('express');
var router = express.Router();
var knex = require('knex');
var rp = require('request-promise').defaults({ simple: false });
require('dotenv').load();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/instagram', function(req, res, next) {
  res.redirect('https://api.instagram.com/oauth/authorize/?client_id=' + process.env.INSTAGRAM_CLIENT_ID + '&redirect_uri=' + process.env.INSTAGRAM_REDIRECT_URI + '&response_type=code');
});

router.get('/instagram/callback', function(req, res, next) {
  var apiCall = {
    method: 'POST',
    uri: 'https://api.instagram.com/oauth/access_token',
    form: {
      client_id: process.env.INSTAGRAM_CLIENT_ID,
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
      redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
      grant_type: 'authorization_code',
      code: req.query.code,
    },
    json: true,
  }
  rp(apiCall).then(function(data) {
    // return knex('users').insert(user) //save user to talkart db
    console.log(data);
    rp('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + data.access_token)
      .then(function(data) {
        console.log(JSON.parse(data).data);
        res.redirect('/');
      });
  })
})

module.exports = router;
