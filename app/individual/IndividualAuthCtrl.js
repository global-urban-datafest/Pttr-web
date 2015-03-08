(function (window) {
    'use strict';
    
    var angular = window.angular;
    
    angular.module('pttr.individual').controller('IndividualAuthCtrl', ['$state', '$scope', 'AuthService', function ($state, $scope, AuthService) {
        
        $scope.userActions = {};
        
        $scope.userActions.logout = function () {
            AuthService.logout();
        };
        
        $scope.userActions.editProfile = function () {
            $state.go('individualAuth.editProfile');
        };
        
        $scope.userActions.saveProfile = function () {
            
        };
        
    }]);
    
}(window));