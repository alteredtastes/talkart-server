(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('LoginService', LoginService);

  function LoginService($http, $stateParams) {
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
        .then(function(token) {
          return token.data;
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
        return $http.get('/users/:user?token=' + token).then(function(data) {
          userData = data.data;
        })
      },
      returnUserData: function() {
        return userData;
      }
      }
    }
})();
