(function (window) {
    'use strict';
    
    var angular = window.angular;
    
    angular.module('pttr.userEntity').controller('LoginCtrl', ['$scope', '$routeParams', 'AuthService', function ($scope, $routeParams, AuthService) {
        
        $scope.login = {};
        
        $scope.login.submit = function () {
            if ($scope.login.status) {
                delete $scope.login.status;
            }
            if ($routeParams.type == "individual") {
                AuthService.loginIndividual($scope.login.data).then(
                    function (success) {
                        $scope.login.status = {
                            type: "success",
                            msg: success
                        };
                    },
                    function (error) {
                        $scope.login.status = {
                            type: "danger",
                            msg: error
                        };
                    }
                );
            } else if ($routeParams.type == "shelter") {
                AuthService.loginShelter($scope.login.data).then(
                    function (success) {
                        $scope.login.status = {
                            type: "success",
                            msg: success
                        };
                    },
                    function (error) {
                        $scope.login.status = {
                            type: "danger",
                            msg: error
                        };
                    }
                );
            }
        };
        
    }]);
    
}(window));