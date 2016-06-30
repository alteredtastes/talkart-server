var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var jwt = require('jsonwebtoken');

require('dotenv').load();
/* GET users listing. */

function createjwt(userObj) {
  var token = jwt.sign(userObj, process.env.APP_SECRET, {
    expiresIn: '1d'
  });
  return token;
}

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
