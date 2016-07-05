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
      var allCmds = {};
      var b = 0;
      var currentCmdSet = commands;
      allCmds.validCmds = Object.keys(currentCmdSet);
      MonitorService.setValidCmds(allCmds);


      p.setup = function() {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(200,200,200);
        p.myRec.onResult = p.parseResult;
        p.myRec.start();
      }

      p.draw = function() {
        p.ellipse(400,400,400,400);
      }

      //store the current command set from the commands service
      //-->stored in parent service function

      //check to see if command set has the property saidWord
      //

      //if it does and that value is a function then invoke it with p and set allCmds as set commds set
      //if not function, then set current command set as properties
      //typeof currentCmdSet[saidWord]
      //setValidCmds(Object.keys(currentCmdSet))
      p.parseResult = function() {

        saidWord = p.myRec.resultString.split(' ').pop();
        allCmds.logWord = saidWord;

        if(saidWord.indexOf('stop')!== -1) {
          commands['stop']();
          currentCmdSet = commands;
          allCmds.capturedCmd = 'stop';
          allCmds.validCmds = Object.keys(commands);
          MonitorService.setValidCmds(allCmds);
        }

        if(currentCmdSet.hasOwnProperty(saidWord)) {
          allCmds.capturedCmd = saidWord;
          if(typeof currentCmdSet[saidWord] === 'function') {
            currentCmdSet[saidWord](p);
            currentCmdSet = commands;
            allCmds.validCmds = Object.keys(currentCmdSet);
            MonitorService.setValidCmds(allCmds);
          }else {
            currentCmdSet = currentCmdSet[saidWord];
            allCmds.validCmds = Object.keys(currentCmdSet);
            MonitorService.setValidCmds(allCmds);
          }
        }
      }
    }
  }
})();
