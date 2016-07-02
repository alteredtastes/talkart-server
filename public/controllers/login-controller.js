(function () {
  'use strict'

  angular
    .module('talkart')
    .controller('LoginController', LoginController);

  function LoginController(LoginService, $stateParams, $state) {
    var vm = this;
    console.log($stateParams.token);
    if($stateParams.token) {
      LoginService.getUserData($stateParams.token).then(function(data) {
        console.log('inside getUserData');
        $state.go('/users/' + data.user);
      })
    }

    vm.checkUsername = function() {
      LoginService.checkUsername(vm.username).then(function(data) {
        console.log('controller: true = user already exists', data.exists);
      })
    }
    vm.registerUser = function(isValid) {
      event.preventDefault();
      console.log('form is valid', isValid);
      if(isValid)
      vm.full_name = vm.firstname + ' ' + vm.lastname;
      LoginService.registerUser(vm.username, vm.password, vm.full_name)
      .then(function(data) {
        if(data.success) {
          var token = data.token;
          $state.go('main.token', {token: token});
        } else {
          vm.registerError = 'We were unable to process your registration.'
        }
      });
    vm.submitLogin = function() {
      LoginService.submitLogin(vm.username, vm.password).then(function(data) {
        console.log('inside the controller', data);
      });
    };
    }
  }
})();
