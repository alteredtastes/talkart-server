(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('LoginService', LoginService);

  function LoginService($http) {
    return {
      submitLogin: function(username, password) {
        return $http.post('/auth/login', {username: username, password: password}).then(function(data){
          return data.data;
        })
      },
      registerUser: function(username, password) {
        return $http.post('/auth', {username: username, password: password}).then(function(data) {
          return data.data;
        })
      }
    }
  }
})();
