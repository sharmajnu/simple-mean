'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'satellizer',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.details'

]).
config(['$routeProvider', '$authProvider', function($routeProvider, $authProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
      $authProvider.google({
        clientId: '978616852397-tbcptkaj8q0gjtoak4ap58rndnrd0g37.apps.googleusercontent.com',
        url: '/auth/google'
      });
}]);
