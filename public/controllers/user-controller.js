(function () {
  'use strict'

  angular
    .module('talkart')
    .controller("UserController", UserController);

  function UserController(Sketch, LoginService, $stateParams) {
    var vm = this;
    console.log($stateParams.token);
    vm.message = 'you are on the main controller';
    }
})();
