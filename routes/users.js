var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var rp = require('request-promise').defaults({ simple: false });


router.get('/:id/:token', function(req, res, next){
  console.log('this is the req.params.id', req.params.id);
  return knex('users')
    .then(function(data) {
      console.log('this is the data', data);
    })
    .catch(function(err) {
      console.log('this is the error', err);
    })
})

module.exports = router;
