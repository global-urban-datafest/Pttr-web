(function (window) {
    'use strict';
    
    var angular = window.angular;
    
    angular.module('pttr.shelter').controller('ShelterAuthCtrl', ['$state', '$scope', 'AuthService', function ($state, $scope, AuthService) {
        
        $scope.userActions = {};
        
        AuthService.login().then(
            function () {
                console.log(AuthService.isLoggedIn());
            }
        );
        
        $scope.userActions.logout = function () {
            AuthService.logout();
            $state.go('noAuth.home');
        };
        
        $scope.userActions.editProfile = function () {
            $state.go('individualAuth.editProfile');
        };
        
        $scope.userActions.saveProfile = function () {
            
        };
        
    }]);
    
}(window));