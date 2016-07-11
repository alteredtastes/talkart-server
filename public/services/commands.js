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
              dcoords.one = -1;
              return 'stop move'
            },
            right:function() {
              dcoords.one = 1;
              return 'stop move'
            },
            up: function() {
              dcoords.two = -1;
              return 'stop move'
            },
            down: function() {
              dcoords.two = 1;
              return 'stop move'
            },
            stay: function() {
              return 'stay'
            },
          },
          size: {
            bigger: function() {
              dcoords.three = .4;
              dcoords.four = .4;
              return 'stop size'
            },
            smaller: function() {
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
              console.log('inside circle', coords);
              return 'shape'
            },
            rectangle: function() {
              shape = 'rect'; //rect(x,y,z,w,h)
              coords.one = 200;
              coords.two = 100;
              coords.three = 1;
              coords.four = 300;
              coords.five = 300;
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
        stopMove: {
          stop: function() {
            dcoords = {};
            return 'position'
          },
        },
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
