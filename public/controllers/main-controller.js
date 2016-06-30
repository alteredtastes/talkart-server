(function () {
  'use strict'

  angular
    .module('talkart')
    .controller("MainController", MainController);

  function MainController(Sketch, LoginService, $stateParams) {
    var vm = this;
    if($stateParams.user) {
      LoginService.getToken($stateParams.user);
    }
    vm.message = 'you are on the main controller';
    }
})();
