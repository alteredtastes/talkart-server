(function () {
  'use strict'

  angular
    .module('talkart')
    .controller('LoginController', LoginController);

  function LoginController(LoginService) {
    var vm = this;
    vm.submitLogin = function() {

    };
    vm.getInstaUser = function() {
      LoginService.getInstaUser().then(function(data) {
        console.log(data);
      })
    }

  }
})();
