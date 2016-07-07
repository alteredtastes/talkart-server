(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('MonitorService', MonitorService);

  function MonitorService($rootScope) {

    var instagramPhotos;
    var cmds;
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
      instagramPhotos = arr;
    }

    function getPhotos() {
      return instagramPhotos;
    }

    function getColor(saidWord) {
      return $http.get('http://www.colr.org/json/tags/' + saidWord).then(function(data) {
        return data.data;
      })
    }

    function runFunction(p) {
      //run through an array of promises pushed with addToSketch
      // Promise.all(promises);
      return p.ellipse(50,50,50,50).rect(50,50,50,50)
    }

    function addToSketch(p) {
      //consider creating an array of dynamic variables with each elements id.
      //access their dynamic variables with indexOf('dx' + elementId)
      return 'each commands function ends with this method, the result is pushed to a promise array'
    }

    setInterval(function(){

      $rootScope.$evalAsync(notifyValidCmdsChanged);
    }, 1000);

    return {
      onValidCmdsChanged: onValidCmdsChanged,
      offValidCmdsChanged: offValidCmdsChanged,
      setValidCmds: setValidCmds,
      setPhotos: setPhotos,
      getPhotos: getPhotos,
      runFunction: runFunction,
    }
  }
})();
