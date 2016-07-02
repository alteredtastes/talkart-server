var express = require('express');
var router = express.Router();
var knex = require('knex');
var rp = require('request-promise').defaults({ simple: false });
var jwt = require('jsonwebtoken');
require('dotenv').load();


router.get('/:id/:token', function(req, res, next){
  console.log('this is the id', req.params.id);
  console.log('this is the token', req.params.token);
})


module.exports = router;
