(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('commands', commands);

  function commands(p5, MonitorService, LoginService, $http, $location, $timeout) {
    var build = [];
    var coords = [];
    var index;
    var colors = [];
    var colrorg = [];
    var shape;
    var photoUrls;
    return {
      valid: {
        transform: function(p){
          return 'this is the transform key'
        },
        move: {

        },
        erase: function(p) {
          return 'this is the erase key'
        },
        create: {
          background: {
            photo: {
              instagram: function(p) {
                window.location.href = 'auth/instagram';
              },
              flickr: function(p) {
                return 'return flickr photos';
              },
            },
            color: {
              run: function(p, bgs, saidWord, test, prevWord) {
                colors = [];
                $http.get('http://www.colr.org/json/tag/' + prevWord).then(function(data) {
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
            circle: function(p, bgs, saidWord, test, prevWord) {
              build.push('ellipse');
              var a = 40;
              var b = 40;
              var c = 40;
              var d = 40;
              var e = null;
              var f = null;
              index = coords.push([a, b, c, d, e, f]);
              // coords.push([40,40,40,40]);
              MonitorService.runFunction(p, build, coords, index);
            },
            triangle: function(p){
              build.push('triangle');
              coords.push([30,30,30,30,30,30]);
              MonitorService.runFunction(p, build, coords);
            },
          },
          text: {
            word: function(p) {
              return //capture word to pass to this.invalid.text(p, word)
            },
            phrase: function(p) {
              return //create an array of strings to pass to this.invalid.text(p, arr);
            },
          },
        },
      },
      invalid: {
        collection: function(p, bgs, saidWord, test, prevWord) {
          test[1] = p.image(bgs[saidWord],0,0);
          // p.image(bgs[saidWord],0,0);
        },
        text: function(p, bgs, saidWord, test) {
          return
        },
      },
    }
  }
})();
