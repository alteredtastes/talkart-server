(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('Sketch', Sketch);

  function Sketch(p5, commands, MonitorService, LoginService, $timeout) {

    return function(p, scope) {
      p.myRec = new p5.SpeechRec();
      p.myRec.continuous = true;
      p.myRec.interimResults = true;

      var insta;
      var bg;
      var bgs = [];
      var a = 1;
      var b = 0;
      var index = 0;
      var saidWord;
      var allCmds = {};
      var currentCmdSet = commands;
      allCmds.validCmds = Object.keys(currentCmdSet);
      MonitorService.setValidCmds(allCmds);
      var insta = MonitorService.getPhotos();
      console.log('this is in the sketch', insta);

      p.preload = function() {
        console.log('inside the preload');
        bg = p.loadImage('https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13549590_1045447542216977_624997926_n.jpg?ig_cache_key=MTI4NDUzODg5NTg2MTY4MjMxMA%3D%3D.2.l');
      }

      // function validCmdsChanged(cmdObj) {
      //   insta = cmdObj;
      //
      // }
      //
      // MonitorService.onValidCmdsChanged(validCmdsChanged);


      // scope.$on('$destroy', function() {
      //   MonitorService.offValidCmdsChanged(validCmdsChanged);
      // });

      p.setup = function() {
        p.createCanvas(640, 640);
        p.background(bg)
        p.myRec.onResult = p.parseResult;
        p.myRec.start();
      }

      p.draw = function() {
        MonitorService.runFunction(p);

      }

      p.parseResult = function() {

        saidWord = p.myRec.resultString.split(' ').pop();
        allCmds.logWord = saidWord;

        if(saidWord.indexOf('stop') !== -1) {
          commands['stop']();
          currentCmdSet = commands;
          allCmds.capturedCmd = 'stop';
          allCmds.validCmds = Object.keys(commands);
          MonitorService.setValidCmds(allCmds);
        }

        if(currentCmdSet.hasOwnProperty(saidWord)) {
          allCmds.capturedCmd = saidWord;
          if(typeof currentCmdSet[saidWord] === 'function') {
            var photo = currentCmdSet[saidWord](p);
            console.log('this is photo', photo);
            p.background(photo);
            if(Array.isArray(rtn)) {
              console.log(rtn[0]);
            } else {
              currentCmdSet[saidWord](p);
              currentCmdSet = commands;
              allCmds.validCmds = Object.keys(currentCmdSet);
              MonitorService.setValidCmds(allCmds);

            }
            // if(currentCmdSet[saidWord(p) ===])
          } else {
            currentCmdSet = currentCmdSet[saidWord];
            allCmds.validCmds = Object.keys(currentCmdSet);
            MonitorService.setValidCmds(allCmds);
          }
        }
      }
    }
  }
})();
