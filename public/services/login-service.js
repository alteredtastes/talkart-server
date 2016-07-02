(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('LoginService', LoginService);

  function LoginService($http, $state) {
    var token;
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
      getUserData: function(token) {
        return $http.get('/users/' + token).then(function(data) {
          userData = data.data;
        })
      }
      }
    }
})();
