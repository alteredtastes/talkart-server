(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('Sketch', Sketch);

  function Sketch(p5, Creator) {
    return function(p) {
      p.setup = function() {
        p.createCanvas(800, 800);
        p.background(200,200,200);
      }

      p.draw = function() {
      }
    }
  }
})();
