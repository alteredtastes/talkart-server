(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('MonitorService', MonitorService);

  function MonitorService($rootScope) {

    // var coords = {
    //   x1: 50,
    //   y1: 50,
    //   x2: 0,
    //   y2: 0,
    //   x3: 0,
    //   y3: 0,
    //   z: 0,
    //   w: 50,
    //   h: 50,
    // };

    var photoObjs;
    var action;
    var self = this;
    this.subscribers = [];
    this.validCmds = {
      validCmds: [],
      logWord: '',
      capturedCmd: '',
      captureId: '',
      photos: [],
    }

    function onValidCmdsChanged(subscriber) {
      subscriber(self.validCmds);
      self.subscribers.push(subscriber);
    }

    function offValidCmdsChanged(subscriber) {
      var index = self.subscribers.indexOf(subscriber);
      if(index > -1) {
        self.subscribers.splice(index, 1);
      }
    }

    function notifyValidCmdsChanged() {
      self.subscribers.forEach(function(subscriber) {
        subscriber(self.validCmds);
      });
    }

    function setValidCmds(obj) {
      return self.validCmds = obj;
    }

    function setPhotos(arr) {
      return photoObjs = arr;
    }

    function getPhotos() {
      return photoObjs;
    }

    function getColor(saidWord) {
      return $http.get('http://www.colr.org/json/tags/' + saidWord).then(function(data) {
        return data.data;
      })
    }

    function getCoords() {
      return coords;
    }

    function runFunction(command) {

    }

    setInterval(function(){

      $rootScope.$evalAsync(notifyValidCmdsChanged);
    }, 300);

    return {
      onValidCmdsChanged: onValidCmdsChanged,
      offValidCmdsChanged: offValidCmdsChanged,
      setValidCmds: setValidCmds,
      setPhotos: setPhotos,
      getPhotos: getPhotos,
      getCoords: getCoords,
      runFunction: runFunction,
    }
  }
})();
