(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('LoginService', LoginService);

  function LoginService($http, $stateParams, $state, MonitorService) {
    var userData;
    var id;
    var token;
    return {
      checkUsername: function(username) {
        return $http.get('/auth/' + username).then(function(data) {
          return data.data;
        })
      },
      registerUser: function(username, password, full_name) {
          return $http.post('/auth', {
          username: username,
          password: password,
          full_name: full_name,
        })
        .then(function(data) {
          return data.data;
        })
      },
      submitLogin: function(username, password) {
        return $http.post('/auth/login', {
          username: username,
          password: password
        }).then(function(data){
          return data.data;
        })
      },
      getUserData: function(id, token) {
        id = id;
        token = token;
        return $http.get('/users/' + id + '/' + token).then(function(data) {
          console.log(data.data);
          //set photos to validCmds in MonitorService
          var photoObjs = data.data.instagram_user_media;
          var urlArray = [];
          for (var i = 0; i < photoObjs.length; i++) {
            urlArray.push(photoObjs[i].photo_urls_instagram);
          }
          MonitorService.setPhotos(urlArray);
          return userData = data.data;
        })
      },
      returnUserData: function() {
        return userData;
      },
    }
  }
})();
