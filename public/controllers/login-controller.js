(function () {
  'use strict'

  angular
    .module('talkart')
    .controller('LoginController', LoginController);

  function LoginController(LoginService, $stateParams, $state) {
    var vm = this;

    if($stateParams.token){
      LoginService.getUserData($stateParams.id, $stateParams.token).then(function(data) {
        $state.go('main.user', {user: data.username});
      });
    }

    vm.checkUsername = function() {
      LoginService.checkUsername(vm.username).then(function(data) {
        console.log('form validationg: user exists =', data.exists);
      })
    }

    vm.registerUser = function(isValid) {
      event.preventDefault();
      if(isValid)
      vm.full_name = vm.firstname + ' ' + vm.lastname;
      LoginService.registerUser(vm.username, vm.password, vm.full_name)
      .then(function(data) {
        if(data.success) {
          LoginService.getUserData(data.id, data.token).then(function(data) {
            $state.go('main.user', {user: data.username});
          });
        } else {
          vm.registerError = 'We were unable to process your registration.';
        }
      });
    }

    vm.submitLogin = function() {
      LoginService.submitLogin(vm.username, vm.password).then(function(data) {
        console.log('inside the controller', data);
      });
    }
  }
})();
