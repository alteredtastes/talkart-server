(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('MonitorService', MonitorService);

  function MonitorService($rootScope) {

    var self = this;
    this.subscribers = [];
    this.validCmds = ['stop','create','transform','erase'];


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

    function setValidCmds(arr) {
      return self.validCmds = arr;
    }

    setInterval(function(){
      // self.validCmds.push(self.validCmds[self.validCmds.length - 1] + "o");


      if(self.validCmds.length > 5) {
        self.validCmds.splice(0, 1);
      }

      self.validCmds = angular.copy(self.validCmds);

      $rootScope.$evalAsync(notifyValidCmdsChanged);
    }, 1000);

    return {
      onValidCmdsChanged: onValidCmdsChanged,
      offValidCmdsChanged: offValidCmdsChanged,
      setValidCmds: setValidCmds,
    }
  }
})();
