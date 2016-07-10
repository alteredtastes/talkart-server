(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('commands', commands);

  function commands(p5, MonitorService, LoginService, $http, $location, $timeout) {
    var build = [];
    var colors = [];
    var colrorg = [];
    var shape;
    var photoUrls;

    var x1 = 50;
    var y1 = 50;
    var w = 50;
    var h = 50;

    var shape, fill, stroke;
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
            commit: function() {
              return 'transform'
            }
          },
          size: {},
          fill: {},
          stroke: {},
          commit: function(){
            return 'valid'
          },
        },
        create: {
          background: {
            photo: {
              instagram: function(p, args) {
                window.location.href = 'auth/instagram';
              },
              flickr: function(p, args) {
                return 'return flickr photos';
              },
            },
            color: {
              go: function(p, args) {
                colors = [];
                $http.get('http://www.colr.org/json/tag/' + args.prevWord).then(function(data) {
                  colrorg = data.data.colors;
                  for (var i = 0; i < colrorg.length; i++) {
                    colors.push(colrorg[i].hex);
                  }
                  return p.background("#" + colors[0]);
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
              return //capture word to pass to this.hidden.text(p, word)
            },
            phrase: function() {
              return //create an array of strings to pass to this.hidden.text(p, arr);
            },
          },
        },
      },
      hidden: {
        collection: function(p, args) {
          args.test[0] = p.image(args.bgs[(args.saidWord - 1)],0,0);
        },
        stopMove: {
          stop: function() {
            dcoords = {};
            return 'position'
          },
        },
        getShape: function() {
          console.log('get function', shape);
          return shape;
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
        setCoords: function(obj) {
          coords = obj;
        },
        // setDcoords: function(obj) {
        //   dcoords = obj;
        // },
      },
    }
  }
})();
