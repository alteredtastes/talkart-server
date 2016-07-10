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

      var args = {
        test: [],
        bgs: [],
        saidWord: null,
        prevWord: null,
      }

      var shape, fill, stroke;
      var coords = {};
      var dcoords = {};

      var insta = [];
      var b;
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
        shape = commands.unsaid.getShape(); //returns string
        coords = commands.unsaid.getCoords();  //returns obj
        dcoords = commands.unsaid.getDcoords();   //returns obj
        fill = commands.unsaid.getFill();   //returns hex
        stroke = commands.unsaid.getStroke();   //returns int 1-10

        if(fill) {
          p.fill(fill);
        }

        if(stroke) {
          p.stroke(stroke);
        }

        // console.log(coords);

        if(dcoords.one && shape) {
          p[shape](
            (coords.one += (dcoords.one || null)),
            (coords.two += (dcoords.two || null)),
            (coords.three += (dcoords.three || null)),
            (coords.four += (dcoords.four || null)),
            (coords.five += (dcoords.five || null)),
            (coords.six += (dcoords.six || null)),
            (coords.seven += (dcoords.seven || null)),
            (coords.eight += (dcoords.eight || null))
          );
          commands.unsaid.setCoords(coords);
        } else if(shape) {
          p[shape](
            coords.one,
            coords.two,
            coords.three,
            coords.four,
            coords.five,
            coords.six,
            coords.seven,
            coords.eight
          );
        }



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

        if(args.saidWord.indexOf('commit') !== -1) {
          commands.unsaid(setShape)(shape, coords, dcoords, fill, stroke);
        }

        if(parseInt(args.saidWord)) {
          commands.unsaid.collection(p, args);
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
            var type = currentCmdSet[args.saidWord](p,args);
            currentCmdSet = commands.valid;
            allCmds.validCmds = Object.keys(currentCmdSet);
            if(type === 'shape' || type === 'transform'){
              currentCmdSet = commands.valid.transform;
              allCmds.validCmds = Object.keys(currentCmdSet);
            }
            if(type === 'position'){
              currentCmdSet = commands.valid.transform.position;
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
