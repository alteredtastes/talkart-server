(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('Sketch', Sketch);

  function Sketch(p5, commands, MonitorService, LoginService, $timeout, $state) {

    return function(p, scope) {

      p.myRec = new p5.SpeechRec();
      p.myRec.continuous = true;
      p.myRec.interimResults = true;
      var g = 0;
      var h = 0;
      var j = 0;

      var test = [];
      var insta = [];
      var bgs = [];
      var a = 1;
      var b = 0;
      var index = 0;
      var saidWord;
      var prevWord;
      var allCmds = {};
      var currentCmdSet = commands.valid;
      allCmds.validCmds = Object.keys(currentCmdSet);
      MonitorService.setValidCmds(allCmds);
      insta = MonitorService.getPhotos();

      p.preload = function() {
        if(insta){
          b++;
          for (var i = 0; i < insta.length; i++) {
            bgs.push(p.loadImage(insta[i]));
          }
        }
      }

      p.setup = function() {
        var width = 640;
        var height = 640;
        p.createCanvas(640, 640).position((p.windowWidth - 640) / 2, (p.windowHeight - 640) / 2);
        p.myRec.onResult = p.parseResult;
        p.myRec.start();
      }

      p.draw = function() {
        test = [
          '',
          p.ellipse(70,70,70,70)
        ];
        MonitorService.runFunction(p);
      }

      p.parseResult = function() {


        saidWord = p.myRec.resultString.split(' ').pop();
        saidWord = saidWord.toLowerCase();
        allCmds.logWord = saidWord;
        console.log(saidWord);

        if(saidWord.indexOf('change') !== -1) {
          g += 35;
          h += 35;
          j += 35;
        }

        if(saidWord.indexOf('home') !== -1) {
          window.location.href = '/';
        }

        if(saidWord.indexOf('login') !== -1) {
          $state.go('main.login');
        }

        if(saidWord.indexOf('register') !== -1) {
          $state.go('main.register');
        }

        if(parseInt(saidWord)) {
          commands.invalid.collection(p, bgs, saidWord, test);
        }

        if(saidWord.indexOf('capture') !== -1) {
          // send
        }

        if(saidWord.indexOf('stop') !== -1) {
          // commands.valid['stop']();
          currentCmdSet = commands.valid;
          allCmds.capturedCmd = 'stop';
          allCmds.validCmds = Object.keys(commands.valid);
          MonitorService.setValidCmds(allCmds);
        }

        if(currentCmdSet.hasOwnProperty(saidWord)) {
          allCmds.capturedCmd = saidWord;
          if(typeof currentCmdSet[saidWord] === 'function') {
            currentCmdSet[saidWord](p);
            currentCmdSet = commands.valid;
            allCmds.validCmds = Object.keys(currentCmdSet);
          } else {
            currentCmdSet = currentCmdSet[saidWord];
            allCmds.validCmds = Object.keys(currentCmdSet);
            // MonitorService.setValidCmds(allCmds);
          }
        }
        prevWord = saidWord;
      }
    }
  }
})();
