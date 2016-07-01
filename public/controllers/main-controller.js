(function () {
  'use strict'

  angular
    .module('talkart')
    .controller("MainController", MainController);

  function MainController(Sketch, LoginService, $stateParams) {
    var vm = this;
    if($stateParams.token) {
      console.log('inside the controller');
      LoginService.getUserData($stateParams.token).then(function(data) {
        state.go('/users/' + data.user)
      })
    }

  }
})();
