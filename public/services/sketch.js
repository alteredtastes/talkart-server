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

      var args = {
        test: [],
        bgs: [],
        saidWord: null,
        prevWord: null,
        cmdRtn: {
          type: null,
          arg: null,
        }
      }

      var x = 50;
      var y = 50;
      var w = 50;

      var insta = [];
      var a = 1;
      var b;
      // var test = [];
      // var bgs = [];
      // var saidWord;
      // var prevWord;
      // var cmdRtn;
      var allCmds = {};
      allCmds.photos = [];
      var currentCmdSet = commands.valid;
      allCmds.validCmds = Object.keys(currentCmdSet);
      insta = MonitorService.getPhotos();

      p.preload = function() {
        if(insta){
          b = 1;
          for (var i = 0; i < insta.length; i++) {
            args.bgs.push(p.loadImage(insta[i]));
            allCmds.photos.push(insta[i]);
          }
        }
      }

      p.setup = function() {
        var width = 640;
        var height = 640;
        p.createCanvas(640, 640)
        .position((p.windowWidth - 640) / 2, (p.windowHeight - 640) / 2);
        p.myRec.onResult = p.parseResult;
        p.myRec.start();
        MonitorService.setValidCmds(allCmds);
      }

      p.draw = function() {
      }

      p.parseResult = function() {

        args.saidWord = p.myRec.resultString.split(' ').pop();
        args.saidWord = args.saidWord.toLowerCase();
        allCmds.logWord = args.saidWord;
        console.log(args.saidWord);
        MonitorService.setValidCmds(allCmds);

        if(args.saidWord.indexOf('home') !== -1) {
          window.location.href = '/';
        }

        if(args.saidWord.indexOf('login') !== -1) {
          $state.go('main.login');
        }

        if(args.saidWord.indexOf('register') !== -1) {
          $state.go('main.register');
        }

        if(parseInt(args.saidWord)) {
          commands.invalid.collection(p, args);
        }

        if(args.saidWord.indexOf('stop') !== -1) {
          // commands.valid['stop']();
          currentCmdSet = commands.valid;
          allCmds.capturedCmd = 'stop';
          allCmds.validCmds = Object.keys(commands.valid);
          MonitorService.setValidCmds(allCmds);
        }

        if(currentCmdSet.hasOwnProperty(args.saidWord)) {
          allCmds.capturedCmd = args.saidWord;
          if(typeof currentCmdSet[args.saidWord] === 'function') {
            args.cmdRtn.type = currentCmdSet[args.saidWord](p, args);
            currentCmdSet = commands.valid;
            allCmds.validCmds = Object.keys(currentCmdSet);
            if(args.cmdRtn.type === 'shape'){
              currentCmdSet = commands.valid.transform;
              allCmds.validCmds = Object.keys(currentCmdSet);
            }
          } else {
            currentCmdSet = currentCmdSet[args.saidWord];
            allCmds.validCmds = Object.keys(currentCmdSet);
            // MonitorService.setValidCmds(allCmds);
          }
        }
        args.prevWord = args.saidWord;
      }
    }
  }
})();
