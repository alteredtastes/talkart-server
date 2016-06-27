(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('commands', commands);

  function commands(p5) {
    var shape;

    return {
      stop: function() {
        return 'this is the stop key'
      },
      create: function() {
        return 'this is the create key'
      },
      transform: function(){
        return 'this is the transform key'
      },
      erase: function() {
        return 'this is the erase key'
      },
      // makeShapeCircle: function(p) {
      //   shape = p.ellipse(50,50,50,50);
      // },
      giveShapeCircle: function() {
        return shape;
      }
    }
  }
})();
