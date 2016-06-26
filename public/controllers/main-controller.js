(function () {
  'use strict'

  angular
    .module('talkart')
    .controller("MainController", MainController);

  function MainController(Sketch, Login) {
    var vm = this;
    vm.message = 'you are on the main controller';
    Login.getUser().then(function(data) {
      vm.user = data;
    })
  }

})();
