(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('LoginService', LoginService);

  function LoginService($http, $stateParams, $state) {
    var userData;
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
        return $http.get('/users/' + id + '/' + token).then(function(data) {
          return userData = data.data;
        })
      },
      returnUserData: function() {
        return userData;
      }
    }
  }
})();
