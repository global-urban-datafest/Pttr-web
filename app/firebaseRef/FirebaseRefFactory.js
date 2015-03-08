(function (window) {
    'use strict';
    
    var angular = window.angular,
        Firebase = window.Firebase;
    
    angular.module('firebaseRef').factory('FirebaseRefFactory', [function () {
       
        return new Firebase("https://pttr.firebaseio.com/");
        
    }]);
    
}(window));