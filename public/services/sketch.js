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

      var insta = [];
      var bgs;
      var a = 1;
      var b = 0;
      var index = 0;
      var saidWord;
      var prevWord;
      var allCmds = {};
      var currentCmdSet = commands;
      allCmds.validCmds = Object.keys(currentCmdSet);
      MonitorService.setValidCmds(allCmds);
      insta = MonitorService.getPhotos();

      p.preload = function() {
        bgs = ['rgba(0,255,0, 0.0)'];
        if(insta){
          b++;
          for (var i = 0; i < insta.length; i++) {
            bgs.push(p.loadImage(insta[i]));
          }
        }
      }

      p.setup = function() {
        p.createCanvas(640, 640).position((p.windowWidth - 640) / 2, (p.windowHeight - 640) / 2);
        p.background(bgs[b]);
        p.ellipse(10,10,10,10);
        p.myRec.onResult = p.parseResult;
        p.myRec.start();
        MonitorService.runFunction(p);
      }

      p.draw = function() {
      }

      p.parseResult = function() {

        saidWord = p.myRec.resultString.split(' ').pop();
        saidWord = saidWord.toLowerCase();
        allCmds.logWord = saidWord;
        console.log(saidWord);

        if(parseInt(saidWord)) {
          b = saidWord;
          p.background(bgs[b]);
        }

        if(saidWord.indexOf('login') !== -1) {
          $state.go('main.login');
        }

        if(saidWord.indexOf('home') !== -1) {
          window.location.href = '/';
        }

        if(saidWord.indexOf('register') !== -1) {
          $state.go('main.register');
        }

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
