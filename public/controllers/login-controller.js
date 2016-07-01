(function () {
  'use strict'

  angular
    .module('talkart')
    .controller('LoginController', LoginController);

  function LoginController(LoginService) {
    var vm = this;
    // vm.matchPassword = (vm.password === vm.password2) ? true : false;
    vm.submitLogin = function() {
      LoginService.submitLogin(vm.username, vm.password).then(function(data) {
        console.log(data); //returns wrong pass or success
      });
    };
    vm.registerUser = function(isValid) {
      event.preventDefault();
      console.log(isValid);
      if(isValid)
      vm.full_name = vm.firstname + ' ' + vm.lastname;
      LoginService.registerUser(vm.username, vm.password, vm.full_name).then(function(data) {
        console.log(data); //
      });
    }
  }
})();
