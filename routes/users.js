var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var rp = require('request-promise').defaults({ simple: false });


router.get('/:id/:token', function(req, res, next){
  return knex('users')
    .where({id: req.params.id})
    .then(function(userData) {
      return knex('photos')
        .where({user_id: req.params.id})
        .then(function(mediaData) {
          console.log('this is the then', mediaData);
          res.json({
            username: userData[0].username,
            full_name: userData[0].full_name,
            instagram_id: userData[0].instagram_id,
            instagram_username: userData[0].instagram_username,
            instagram_profile_pic: userData[0].instagram_profile_pic,
            instagram_user_media: mediaData,
          })
        })
        .catch(function(mediaData) {
          console.log('this is the catch', mediaData.data);
      })
    })
})

module.exports = router;
