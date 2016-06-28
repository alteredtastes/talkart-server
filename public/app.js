(function () {
  'use strict'

  angular
    .module('talkart', ['ui.router', 'angular-p5'])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: 'partials/main.html',
          controllerAs: 'main',
          controller: 'MainController'
        })
        .state('main.login', {
          templateUrl: 'partials/main.login.html',
        })
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    });
})();
  
