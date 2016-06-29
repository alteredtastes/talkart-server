var express = require('express');
var router = express.Router();
var rp = require('request-promise').defaults({ simple: false });
require('dotenv').load();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/instagram', function(req, res, next) {
  res.redirect('https://api.instagram.com/oauth/authorize/?client_id=' + process.env.INSTAGRAM_CLIENT_ID + '&redirect_uri=' + process.env.INSTAGRAM_REDIRECT_URI + '&response_type=code');
});

router.get('/instagram/api-callback', function(req, res, next) {
  console.log('inside the callback');
  console.log(req.query.code);
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
  console.log(apiCall);
  rp(apiCall).then(function(data) {
    console.log(data);
  })
})

module.exports = router;
