(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('commands', commands);

  function commands(p5, MonitorService, LoginService, $http, $location, $timeout) {
    var build = [];
    var colrorg = [];
    var shape;
    var photoUrls;

    var x1 = 50;
    var y1 = 50;
    var w = 50;
    var h = 50;

    var shape, fill, stroke;
    var bgIndex = 0;
    var bgMode;
    var backgrounds = [];
    var photos = [];
    var colors = [];
    var coords = {};
    var dcoords = {};

    return {
      valid: {
        transform: {
          position: {
            left: function() {
              dcoords = {};
              dcoords.one = -1;
              return 'position'
            },
            right:function() {
              dcoords = {};
              dcoords.one = 1;
              return 'position'
            },
            up: function() {
              dcoords = {};
              dcoords.two = -1;
              return 'position'
            },
            down: function() {
              dcoords = {};
              dcoords.two = 1;
              return 'position'
            },
            stop: function() {
              dcoords = {};
              return 'stay'
            },
          },
          size: {
            enlarge: function() {
              dcoords.three = .4;
              dcoords.four = .4;
              return 'stop size'
            },
            shrink: function() {
              dcoords.three = -.4;
              dcoords.four = -.4;
              return 'stop size'
            },
            stay: function() {
              return 'stay'
            },
          },
          fill: {},
          stroke: {},
          commit: function(){
            return 'valid'
          },
        },
        create: {
          background: {
            photo: {
              instagram: function() {
                if(photos.length > 0) {
                  backgrounds = photos;
                } else {
                  window.location.href = 'auth/instagram';
                }
              },
              flickr: function(p, args) {
                return 'return flickr photos';
              },
              cancel: function() {
                return 'cancel';
              }
            },
            color: {
              go: function(p, args) {
                bgMode = 'color';
                colors = [];
                $http.get('http://www.colr.org/json/tag/' + args.prevWord).then(function(data) {
                  colrorg = data.data.colors;
                  for (var i = 0; i < 15; i++) {
                    colors.push('#' + colrorg[i].hex);
                  }
                  backgrounds = colors;
                });
              },
            },
          },
          shape: {
            circle: function() {
              shape = 'ellipse'; //ellipse(x,y,w,h)
              coords.one = 50;
              coords.two = 50;
              coords.three = 50;
              coords.four = 50;
              return 'shape'
            },
            rectangle: function() {
              shape = 'rect'; //rect(x,y,w,h)
              coords.one = 200;
              coords.two = 100;
              coords.three = 300;
              coords.four = 300;
              return 'shape'
            },
            triangle: function() {
              shape = 'triangle'; //triangle(x1,y1,x2,y2,x3,y3)
              return 'shape'
            },
            line: function() { //line(x1,y1,x2,y2)
              shape = 'line';
              return 'shape'
            },
          },
          text: {
            word: function() {
              return
            },
            phrase: function() {
              return
            },
          },
        },
      },
      hidden: {
        stopSize: {
          stop: function() {
            dcoords = {};
            return 'size'
          }
        },
        setBackgrounds: function(arr) {
          backgrounds = arr;
        },
        getBackgrounds: function() {
          return backgrounds;
        },
        setPhotos: function(arr) {
          photos = arr;
        },
        setBgIndex: function(saidInt) {
          if(saidInt){
            bgIndex = saidInt - 1;
          } else {
            bgIndex = 0;
          }
        },
        getBgIndex: function() {
          return bgIndex;
        },
        getBgMode: function() {
          return bgMode || 'color';
        },
        setBgMode: function() {
          bgMode = 'photo';
        },
        getShape: function() {
          return shape;
        },
        setCoords: function(obj) {
          coords = obj;
        },
        getCoords: function() {
          return coords;
        },
        getDcoords: function() {
          return dcoords;
        },
        getFill: function() {
          return fill;
        },
        getStroke: function() {
          return stroke;
        },
      },
    }
  }
})();
