(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('LoginService', LoginService);

  function LoginService($http) {
    return {
      submitLogin: function(username, password) {
        return $http.post('/users/login', {username: username, password: password}).then(function(data){
          return data.data;
        })
      },
      registerUser: function(username, password) {
        return $http.post('/users', {username: username, password: password}).then(function(data) {
          return data.data;
        })
      }
    }
  }
})();
