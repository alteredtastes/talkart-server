(function () {
  'use strict'

  angular
    .module('talkart')
    .controller("MainController", MainController);

  function MainController(LoginService, MonitorService, $stateParams, $scope) {
    var vm = this;
    vm.validCmds = [];

    function validCmdsChanged(validCmds) {
      vm.validCmds = validCmds;
    }

    MonitorService.onValidCmdsChanged(validCmdsChanged);

    $scope.$on('$destroy', function() {
      MonitorService.offValidCmdsChanged(validCmdsChanged);
    });

    if($stateParams.user) {
      vm.data = LoginService.returnUserData();
      vm.username = vm.data.username;
      vm.fullName = vm.data.full_name;
      vm.instagramId = vm.data.instagram_id;
      vm.instagramUsername = vm.data.instagram_username;
      vm.portrait = vm.data.instagram_profile_pic;
      console.log('fullName:', vm.fullName);
      vm.instagramPhotos = vm.data.instagram_user_media;

      }
    }
})();
