(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('commands', commands);

  function commands(p5, MonitorService, LoginService, $http, $location) {
    var shape;
    var photoUrls;
    return {
      transform: function(p){
        return 'this is the transform key'
      },
      move: {

      },
      erase: function() {
        return 'this is the erase key'
      },
      create: {
        background: {
          photo: {
            instagram: function(p) {
              window.location.href = 'auth/instagram';
            },
            flickr: function() {
              return 'return flickr photos';
            },
          },
          color: function(saidWord) {
            return 'colors';
          }
        },
        circle: function(p) {
          return p.ellipse(50,50,50,50);
        },
        rectangle: function() {
          return 'this is the create -> rectangle sequence'
        },
        line: function() {
          return 'this is the create -> line sequence'
        }
      },
    }
  }
})();
