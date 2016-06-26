(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('Creator', Creator);

  function Creator(p5) {
    var shape;

    return {
      makeShapeCircle: function(p) {
        shape = p.ellipse(50,50,50,50);

      },
      giveShapeCircle: function() {
        return shape;
      }
    }
  }
})();
