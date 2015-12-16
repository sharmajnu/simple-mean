'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: '/components/login/login.html',
            controller: 'View2Ctrl'
        });

    }])
    .controller('View2Ctrl', ['$scope', '$auth', function ($scope, $auth) {

        $scope.authenticated = !!$auth.isAuthenticated();
        $scope.authenticate = function (provider) {

            $auth.authenticate(provider).then(function (response) {

                $scope.authenticated = true;
                $scope.user = response.data.user.name;

            });

        };

        $scope.logOut = function () {
            $scope.authenticated = false;
            $auth.logout();
        }
    }]);