(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('Login', Login);

  function Login($http) {
    return {
      getUser: function() {
        return $http.get('/users').then(function(data){
          console.log(data.data[0].username);
          return data.data[0].username;
        })
      }
    }
  }
})();
