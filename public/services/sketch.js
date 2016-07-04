(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('Sketch', Sketch);

  function Sketch(p5, commands, MonitorService) {

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
        // MonitorService.setLogWord(saidWord);

        if(saidWord.indexOf('stop')!==-1) {
          // MonitorService.setCapturedCmd(saidWord);
          commands['stop']();
          saidWord = '';
          cmds = '';
          vcmd = {};
        }

        var currentKeys = Object.keys(commands);
        MonitorService.setValidCmds(currentKeys);
        for (var i = 0; i < currentKeys.length; i++) {
          console.log('inside the key', currentKeys[i]);
          if(saidWord.indexOf(currentKeys[i]) != -1) {
            // MonitorService.setCapturedCmd(saidWord);
            vcmd = {};
            a = 1;
            key = 'word' + a.toString();
            vcmd.key = currentKeys[i];
            cmds = commands[currentKeys[i]];
            a++;
          }
        }
      }
    }
  }
})();
