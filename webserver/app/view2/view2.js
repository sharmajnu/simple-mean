'use strict';

angular.module('myApp.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
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