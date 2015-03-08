(function (window) {
    'use strict';
    
    var angular = window.angular;
    
    angular.module('pttr.userEntity').controller('CreateCtrl', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {
        
        $scope.create = {
            data: {
                name: "",
                email: "",
                password: "",
                address: "",
                phone: ""
            }
        };
        
        var loginType = $location.path().split("/")[2];
        
        $scope.create.submit = function () {
            $scope.login.status = {
                type: "info",
                msg: "Creating your account. Please wait"
            };
            if (loginType === "individual") {
                AuthService.registerIndividual($scope.create.data).then(
                    function (success) {
                        $scope.create.status = {
                            type: "success",
                            msg: success
                        };
                    },
                    function (error) {
                        $scope.create.status = {
                            type: "danger",
                            msg: error
                        };
                    }
                );
            } else if (loginType === "shelter") {
                AuthService.registerIndividual($scope.create.data).then(
                    function (success) {
                        $scope.create.status = {
                            type: "success",
                            msg: success
                        };
                    },
                    function (error) {
                        $scope.create.status = {
                            type: "danger",
                            msg: error
                        };
                    }
                );
            }
        };
        
    }]);
    
}(window));