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
      create: {
        circle: function() {
          return 'this is the create -> circle sequence'
        },
        rect: function() {
          return 'this is the create -> rectangle sequence'
        },
        line: function() {
          return 'this is the create -> line sequence'
        }
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
      // giveShapeCircle: function() {
      //   return shape;
      // }
    }
  }
})();
