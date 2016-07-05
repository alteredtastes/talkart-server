(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('commands', commands);

  function commands(p5, MonitorService) {
    var shape;

    return {
      stop: function() {
        return 'this is the stop key'
      },
      // create: function(p) {
      //   return p.ellipse(50,50,50,50);
      // },
      create: {
        background: {
          photo: {
            Instagram: function() {
              MonitorService.getPhotos().then(function(photos) {
                return photos;
              })
            },
            Flickr: function() {
              return 'return flickr photos';
            }
          },
          color: function(saidWord) {
            MonitorService.getColor(saidWord).then(function(data) {
              console.log('array of hex colors by tag', data.colors);
              console.log('single hex example would be', data.colors[0].hex);
            })
          }
        },
        circle: function() {
          return 'this is the create -> circle sequence'
        },
        rect: function() {
          return 'this is the create -> rectangle sequence'
        },
        line: function() {
          return 'this is the create -> line sequence'
        }
      },
      transform: function(){
        return 'this is the transform key'
      },
      erase: function() {
        return 'this is the erase key'
      },
      // makeShapeCircle: function(p) {
      //   shape = p.ellipse(50,50,50,50);
      // },
      // giveShapeCircle: function() {
      //   return shape;
      // }
    }
  }
})();
