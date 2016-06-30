var express = require('express');
var router = express.Router();
var knex = require('knex');
var rp = require('request-promise').defaults({ simple: false });
require('dotenv').load();


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


module.exports = router;
