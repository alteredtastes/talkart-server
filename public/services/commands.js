(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('commands', commands);

  function commands(p5, MonitorService, LoginService, $http, $location) {
    var build = [];
    var shape;
    var photoUrls;
    return {
      valid: {
        transform: function(p){
          return 'this is the transform key'
        },
        move: {

        },
        erase: function(p) {
          return 'this is the erase key'
        },
        create: {
          background: {
            photo: {
              instagram: function(p) {
                window.location.href = 'auth/instagram';
              },
              flickr: function(p) {
                return 'return flickr photos';
              },
            },
            color: {
              process: function(p, prevWord) {
                return // MonitorService.getColors(prevWord);
                },
              },
            },
          shape: {
            circle: function(p) {
              return
              // build.push(p['ellipse'](30,30,30,30));
            },
            triangle: function(p){
              return
            },
          },
          text: {
            word: function(p) {
              return //capture word to pass to this.invalid.text(p, word)
            },
            phrase: function(p) {
              return //create an array of strings to pass to this.invalid.text(p, arr);
            },
          },
        },
      },
      invalid: {
        collection: function(p, bgs, saidWord) {
          p.image(bgs[saidWord],0,0);
        },
        text: function(p, wordsOrWord) {
          return
        },
      },
    }
  }
})();
