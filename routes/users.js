var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
router.get('/', (req, res, next) => {
  return knex('users')
    .then(function(data){
      res.json(data);
    });
});

module.exports = router;
