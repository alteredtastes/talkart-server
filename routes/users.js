var express = require('express');
var router = express.Router();
var knex = require('knex');
var rp = require('request-promise').defaults({ simple: false });
var jwt = require('jsonwebtoken');
require('dotenv').load();


router.get('/getuser', function(req, res, next){
  console.log('this is the token in the /users/ in express', req.query.token);
})


module.exports = router;
