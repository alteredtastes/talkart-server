var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var jwt = require('jsonwebtoken');

require('dotenv').load();
/* GET users listing. */

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
  return knex('users')
    .where({username: req.body.username})
    .then(function(data) {
      if(data[0].password === req.body.password) {
        console.log(data[0]);
        var token = jwt.sign(data[0], process.env.APP_SECRET, {
          expiresIn: '1d'
        }
    );
        res.json({success: true, message: 'Here is your token.', token: token});
      } else {
        res.json({success: false, message: 'wrong password!'});
      }
    })
    .catch(function(err) {
      res.json({success:false, message: err});
    });
});

router.post('/', (req, res, next) => {
  return knex('users')
    .insert({username: req.body.username, password: req.body.password})
    .then(function(data) {
      res.send('success! user & pass inserted.');
    })
    .catch(function(err) {
      res.send('username taken!');
    });
})

module.exports = router;
