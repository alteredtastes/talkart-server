(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('commands', commands);

  function commands(p5, MonitorService, LoginService, $http, $location, $timeout) {
    var a = 40;
    var b = 60;
    var c = 34;
    var d = 78;
    var e = 11;
    var f = 3;
    var build = [];
    var coords = [];
    var index;
    var colors = [];
    var colrorg = [];
    var shape;
    var photoUrls;

    return {
      valid: {
        transform: {
          position: {},
          size: {},
          fill: {},
          stroke: {},
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
              run: function(p, args) {
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
            circle: function(p, args) {
              build.push('ellipse');
              coords.push([a, b, c, d, e, f]);
              MonitorService.runFunction(p, build, coords);
              return 'shape';
            },
            triangle: function(p, args) {
              build.push('triangle');
              coords.push([a, b, c, d, e, f]);
              MonitorService.runFunction(p, build, coords);
              return 'shape';
            },
            rectangle: function(p, args) {
              build.push('rect');
              coords.push([a, b, c, d, e, f]);
              MonitorService.runFunction(p, build, coords);
              return {
                type: 'shape',
                arg: 'rect',
              };
            },
          },
          text: {
            word: function(p, args) {
              return //capture word to pass to this.invalid.text(p, word)
            },
            phrase: function(p, args) {
              return //create an array of strings to pass to this.invalid.text(p, arr);
            },
          },
        },
      },
      invalid: {
        collection: function(p, args) {
          args.test[0] = p.image(args.bgs[(args.saidWord - 1)],0,0);
          // p.image(args.bgs[args.saidWord],0,0);
        },
        text: function(p, args) {
          return
        },
      },
    }
  }
})();
