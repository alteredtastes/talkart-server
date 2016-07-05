(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('MonitorService', MonitorService);

  function MonitorService($rootScope) {

    var self = this;
    this.subscribers = [];
    this.validCmds = {
      validCmds: [],
      logWord: '',
      capturedCmd: '',
      captureId: '',
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

    setInterval(function(){

      $rootScope.$evalAsync(notifyValidCmdsChanged);
    }, 1000);

    return {
      onValidCmdsChanged: onValidCmdsChanged,
      offValidCmdsChanged: offValidCmdsChanged,
      setValidCmds: setValidCmds,
    }
  }
})();
