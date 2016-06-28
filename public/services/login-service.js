(function () {
  'use strict'

  angular
    .module('talkart')
    .factory('LoginService', LoginService);

  function LoginService($http) {
    return {
      getUser: function() {
        return $http.get('/users').then(function(data){
          console.log(data.data[0].username);
          return data.data[0].username;
        })
      },
      // getInstaUser: function() {
      //   return $http.get('/auth/instagram').then(function(data) {
      //     console.log('this is in the service', data);
      //   })
      // }
    }
  }
})();
