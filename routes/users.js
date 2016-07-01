var express = require('express');
var router = express.Router();
var knex = require('knex');
var rp = require('request-promise').defaults({ simple: false });
var jwt = require('jsonwebtoken');
require('dotenv').load();


router.get('/:token', function(req, res, next){
  res.json({success: true, message: 'made it to the users route'});
})


module.exports = router;
