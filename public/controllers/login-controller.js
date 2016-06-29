(function () {
  'use strict'

  angular
    .module('talkart')
    .controller('LoginController', LoginController);

  function LoginController(LoginService) {
    var vm = this;
    vm.submitLogin = function() {
      LoginService.submitLogin(vm.username, vm.password).then(function(data) {
        console.log(data); //returns wrong pass or success
      });
    };
    vm.registerUser = function() {
      LoginService.registerUser(vm.username, vm.password).then(function(data) {
        console.log(data);
      });
    }
  }
})();
