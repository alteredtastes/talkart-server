(function () {
  'use strict'

  angular
    .module('talkart')
    .controller("MainController", MainController);

  function MainController(Sketch, LoginService, $stateParams) {
    var vm = this;
    console.log('inside the controller, before the if');
    console.log($stateParams.user);
    if($stateParams.user) {
      console.log('inside the controller');
      console.log('this is user = ', $stateParams.user);
      LoginService.getToken($stateParams.user);
    }
    vm.message = 'you are on the main controller';
    }
})();
