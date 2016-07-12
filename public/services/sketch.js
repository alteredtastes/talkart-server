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

      var shape, fill, stroke, bgMode;
      var bgIndex = 0;
      var backgrounds = [];
      var coords = {};
      var dcoords = {};
      p.build = [];

      var insta = [];
      var allCmds = {};
      allCmds.photos = [];
      var currentCmdSet = commands.valid;
      allCmds.validCmds = Object.keys(currentCmdSet);
      insta = MonitorService.getPhotos();

      function Shape (shape, fill, stroke, c1, c2, c3, c4, c5, c6, c7, c8) {
        this.shape = shape;
        this.fill = fill;
        this.stroke = stroke;
        this.c1 = c1;
        this.c2 = c2;
        this.c3 = c3;
        this.c4 = c4;
        this.c5 = c5;
        this.c6 = c6;
        this.c7 = c7;
        this.c8 = c8;
        this.display = function() {
          if (this.stroke) {
            p.stroke(this.stroke);
          }
          if (this.fill) {
            p.fill(this.fill);
          }
          p[this.shape](this.c1, this.c2, this.c3, this.c4, this.c5, this.c6, this.c7, this.c8);
        }
      }

      p.preload = function() {
        if(insta){
          for (var i = 0; i < insta.length; i++) {
            args.bgs.push(p.loadImage(insta[i]));
            allCmds.photos.push(insta[i]);
          }
          commands.hidden.setPhotos(args.bgs);
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
        if(args.bgs.length > 0){
          p.background('#ffffff');
          commands.hidden.setBgMode();
          allCmds.photoMode = true;
        }
      }

      p.draw = function() {
        bgIndex = commands.hidden.getBgIndex();
        backgrounds = commands.hidden.getBackgrounds();
        bgMode = commands.hidden.getBgMode();
        shape = commands.hidden.getShape();
        coords = commands.hidden.getCoords();
        dcoords = commands.hidden.getDcoords();
        fill = commands.hidden.getFill();
        stroke = commands.hidden.getStroke();

        if(bgMode === 'photo') {
          p.background(args.bgs[bgIndex]);
          allCmds.photoMode = true;
        }

        if ((backgrounds.length > 0) && bgMode === 'color') {
          p.background(backgrounds[bgIndex]);
          allCmds.photoMode = false;
          allCmds.bgColors = backgrounds;
        }

        if(shape) {
          p.build.push(
            new Shape(
              shape,
              (fill || null),
              (stroke || null),
              (coords.one += (dcoords.one || null)),
              (coords.two += (dcoords.two || null)),
              (coords.three += (dcoords.three || null)),
              (coords.four += (dcoords.four || null)),
              (coords.five += (dcoords.five || null)),
              (coords.six += (dcoords.six || null)),
              (coords.seven += (dcoords.seven || null)),
              (coords.eight += (dcoords.eight || null))
            )
          );
          commands.hidden.setCoords(coords);
        }
        for (var i = 0; i < p.build.length; i++) {
          p.build[i].display();
        }
        if(p.build.length > 0) {
          p.build.splice(0, 1);
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

        if(parseInt(args.saidWord) && args.saidWord < 17) {
          commands.hidden.setBgIndex(args.saidWord);
        }

        if(currentCmdSet.hasOwnProperty(args.saidWord)) {
          allCmds.capturedCmd = args.saidWord;
          if(typeof currentCmdSet[args.saidWord] === 'function') {
            var type = currentCmdSet[args.saidWord](p,args);
            currentCmdSet = commands.valid;
            allCmds.validCmds = Object.keys(currentCmdSet);
            if(type === 'cancel'){
              currentCmdSet = commands.valid;
              allCmds.validCmds = Object.keys(currentCmdSet);
            }
            if(type === 'shape' ||
              type === 'transform' ||
              type === 'stay'){
              currentCmdSet = commands.valid.transform;
              allCmds.validCmds = Object.keys(currentCmdSet);
            }
            if(type === 'stop size'){
              currentCmdSet = commands.hidden.stopSize;
              allCmds.validCmds = Object.keys(currentCmdSet);
            }
            if(type === 'position') {
              currentCmdSet = commands.valid.transform.position;
              allCmds.validCmds = Object.keys(currentCmdSet);
            }
            if(type === 'size') {
              currentCmdSet = commands.valid.transform.size;
              allCmds.validCmds = Object.keys(currentCmdSet);
            }
          } else {
            currentCmdSet = currentCmdSet[args.saidWord];
            allCmds.validCmds = Object.keys(currentCmdSet);
            MonitorService.setValidCmds(allCmds);
          }
        }
        args.prevWord = args.saidWord;
      }
    }
  }
})();
