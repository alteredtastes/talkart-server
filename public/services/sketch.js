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

      var a = 1;
      var saidWord;
      var currentKeys = [];
      var allCmds = {
        validCmds: [],
      };
      var newKey;
      var b = 0;
      var newCmds = commands;

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
        console.log(saidWord + b++);

        if(saidWord.indexOf('stop')!== -1) {
          allCmds.logWord = 'stop';
          allCmds.capturedCmd = 'stop';
          commands['stop']();
          currentKeys = '';
          saidWord = '';
        }

        if(!currentKeys[0]) {
          currentKeys = Object.keys(commands);
          allCmds.validCmds = currentKeys;
        }

        for (var i = 0; i < currentKeys.length; i++) {
          if(saidWord.indexOf(currentKeys[i] != -1)) {
            saidWord = currentKeys[i];
            allCmds.logWord = saidWord;
          }
        }

        for (var key in newCmds) {
          allCmds.validCmds.push(key);
          if(key === saidWord) {
            allCmds.capturedCmd = key;
            allCmds.capturedId = 'word' + a.toString();
            a++;
          }
        }

        MonitorService.setValidCmds(allCmds);
        newCmds = allCmds.saidWord;
      }
    }
  }
})();
