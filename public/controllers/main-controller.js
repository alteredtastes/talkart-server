(function () {
  'use strict'

  angular
    .module('talkart')
    .controller("MainController", MainController);

  function MainController(Sketch, LoginService, $stateParams) {
    var vm = this;
    console.log($stateParams.token);
    vm.message = 'you are on the main controller';
    }
})();
