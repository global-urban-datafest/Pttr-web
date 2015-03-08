(function (window) {
    'use strict';
    
    var angular = window.angular;
    
    angular.module('pttr.userEntity').controller('LoginCtrl', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
        
        $scope.login = {
            data: {
                email: "",
                password: ""
            }
        };
        
        var loginType = $location.path().split("/")[2]; 
        
        $scope.login.submit = function () {
            $scope.login.status = {
                type: "info",
                msg: "Loggin In. Please wait"   
            }
            if (loginType == "individual") {
                AuthService.loginIndividual($scope.login.data.email, $scope.login.data.password).then(
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
            } else if (loginType == "shelter") {
                AuthService.loginShelter($scope.login.data.email, $scope.login.data.password).then(
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
        
        $scope.closeAlert = function () {
            if (angular.isObject($scope.login.status)) {
                delete $scope.login.status;   
            }
        }
        
    }]);
    
}(window));