(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('Voice', Voice);

  function Voice(p5, Creator) {

    return function(p) {
      p.myRec = new p5.SpeechRec();
      p.myRec.continuous = true;
      p.myRec.interimResults = true;

      p.setup = function() {
        p.createCanvas(800, 800);
        p.background(200,200,200);
        p.myRec.onResult = p.parseResult;
        p.myRec.start();
      }

      p.draw = function() {
      }

      p.parseResult = function() {
        var mostrecentword = p.myRec.resultString.split(' ').pop();
        if(mostrecentword.indexOf("make")!==-1) {
          Creator.makeShapeCircle(p);
        }
        // else if(mostrecentword.indexOf("clear")!==-1) { p.background(255); }
        console.log(mostrecentword);
      }
    }
  }
})();
