(function () {
  'use strict'

  angular
    .module('talkart')
    .controller("MainController", MainController);

  function MainController(Sketch, LoginService) {
    var vm = this;
    vm.message = 'you are on the main controller';
    LoginService.getUser().then(function(data) {
      vm.user = data;
    })
  }

})();
