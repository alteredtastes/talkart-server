(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('Sketch', Sketch);

  function Sketch(p5, commands) {

    return function(p) {
      p.myRec = new p5.SpeechRec();
      p.myRec.continuous = true;
      p.myRec.interimResults = true;

      var a;
      var key;
      var saidWord;
      var cmds = '';
      var vcmd = {};
      var vcmds = [];

      p.setup = function() {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(200,200,200);
        p.myRec.onResult = p.parseResult;
        p.myRec.start();
      }

      p.draw = function() {
        p.ellipse(400,400,400,400);
      }

      p.parseResult = function() {
        saidWord = p.myRec.resultString.split(' ').pop();
        if(saidWord.indexOf('stop')!==-1) {
          console.log('caught stop');
          commands['stop']();
          saidWord = '';
          cmds = '';
          vcmd = {};
        }

        for (var i = 0; i < Object.keys(commands).length; i++) {
          // console.log('inside the key', Object.keys(commands)[i]);
          if(saidWord.indexOf(Object.keys(commands)[i]) != -1) {
            // console.log('caught key is = ', Object.keys(commands)[i]);
            vcmd = {};
            a = 1;
            key = 'word' + a.toString();
            vcmd.key = Object.keys(commands)[i];
            cmds = commands[Object.keys(commands)[i]];
            a++;
          }
        }
      }
    }
  }
})();
