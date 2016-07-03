(function () {
  'use strict'

  angular
    .module('talkart')
    .controller("UserController", UserController);

  function UserController(Sketch, LoginService, $stateParams) {
    var vm = this;

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
