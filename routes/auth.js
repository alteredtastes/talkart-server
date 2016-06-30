var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var rp = require('request-promise').defaults({ simple: false });
var jwt = require('jsonwebtoken');

require('dotenv').load();

function createjwt(userObj) {
  var token = jwt.sign(userObj, process.env.APP_SECRET, {
    expiresIn: '1d'
  });
  return token;
}

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

    console.log(data);
    // rp('https://api.instagram.com/v1/users/self/media/recent/?access_token=' + data.access_token)
    //   .then(function(data) {
    //     console.log(JSON.parse(data).data);
    //     res.redirect('/');
    //   });
  })
})

module.exports = router;

router.get('/', (req, res, next) => {
  return knex('users')
    .then(function(data){
      res.json(data);
    })
    .catch(function(err) {
      console.log('Failed to return users from database.');
    });
});

router.post('/login', (req, res, next) => {
  return knex
    .select('id', 'username', 'password')
    .from('users')
    .where({
      username: req.body.username,
    })
    .then(function(data) {
      if(data[0].password === req.body.password) {
        console.log({id: data[0].id, username: data[0].username});
        res.json({
          success: true,
          message: 'Here is your token.',
          token: createjwt({id: data[0].id, username: data[0].username}),
        });
      } else {
        res.json({
          success: false,
          message: 'wrong password!',
        });
      }
    })
    .catch(function(err) {
      res.json({
        success:false,
        message: err,
      });
    });
});

router.post('/', (req, res, next) => {
  return knex('users')
    .insert({
      username: req.body.username,
      password: req.body.password,
    })
    .returning(['id','username'])
    .then(function(data) {
      console.log(data[0]);
      res.json({
        success: true,
        message: 'Heres your token, new user!',
        token: createjwt(data[0]),
      });
    })
    .catch(function(err) {
      res.json({
        success: false,
        message: 'username taken!',
      });
    });
})

module.exports = router;
