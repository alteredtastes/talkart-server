(function () {
  'use strict'

  angular
    .module('talkart', ['ui.router', 'angular-p5'])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

      $stateProvider
        .state('welcome', {
          url: '/',
          templateUrl: 'partials/welcome.html',
          controllerAs: 'main',
          controller: 'MainController'
        })
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    })

})();
