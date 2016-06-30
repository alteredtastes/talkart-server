(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('LoginService', LoginService);

  function LoginService($http) {
    var token;
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
      },
      getToken: function(user) {
        return $http.post('/' + user).then(function(data) {
          token = data[0];
          console.log(token);
        })
      }
    }
  }
})();
