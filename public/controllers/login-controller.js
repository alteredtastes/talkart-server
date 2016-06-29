(function () {
  'use strict'

  angular
    .module('talkart')
    .controller('LoginController', LoginController);

  function LoginController(LoginService) {
    var vm = this;
    vm.submitLogin = function() {
    };
  }
})();
