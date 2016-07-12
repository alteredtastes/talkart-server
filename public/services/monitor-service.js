(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('MonitorService', MonitorService);

  function MonitorService($rootScope) {

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
      photoMode: false,
      bgColors: [],
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
    }
  }
})();
