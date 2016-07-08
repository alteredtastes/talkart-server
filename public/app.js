(function () {
  'use strict'

  angular
    .module('talkart', ['ui.router', 'angular-p5', 'ngAnimate'])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: 'partials/main.html',
          controllerAs: 'main',
          controller: 'MainController',
        })
        .state('main.login', {
          templateUrl: 'partials/main.login.html',
          controllerAs: 'login',
          controller: 'LoginController',
        })
        .state('main.register', {
          templateUrl: 'partials/main.register.html',
          controllerAs: 'login',
          controller: 'LoginController',
        })
        .state('main.token', {
          url: '^/token/:id/:token',
          controllerAs: 'login',
          controller: 'LoginController',
        })
        .state('main.user', {
          url: '^/users/:user',
          templateUrl: 'partials/main.html',
        })
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);

    });
})();
