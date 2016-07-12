(function () {
  'use strict'

  angular
    .module('talkart')
    .controller("MainController", MainController);

  function MainController(LoginService, MonitorService, $stateParams, $scope) {
    var vm = this;
    vm.newCmds = {};
    vm.loggedIn = false;

    function validCmdsChanged(cmdObj) {
      vm.newCmds = cmdObj;
      vm.validCmds = cmdObj.validCmds;
      vm.logWord = cmdObj.logWord;
      vm.photos = cmdObj.photos;
      vm.photoMode = cmdObj.photoMode;
      vm.bgColors = cmdObj.bgColors;
      vm.capturedCmd = cmdObj.capturedCmd;
      if($stateParams.user && !vm.data) {
        vm.data = LoginService.returnUserData();
        vm.username = vm.data.username;
        vm.fullName = vm.data.full_name;
        vm.instagramId = vm.data.instagram_id;
        vm.instagramUsername = vm.data.instagram_username;
        vm.portrait = vm.data.instagram_profile_pic;
        vm.instagramPhotos = vm.data.instagram_user_media;
        vm.loggedIn = true;
      }
    }

    MonitorService.onValidCmdsChanged(validCmdsChanged);

    $scope.$on('$destroy', function() {
      MonitorService.offValidCmdsChanged(validCmdsChanged);
    });


    }
})();
