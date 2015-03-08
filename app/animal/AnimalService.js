(function (window) {
    'use strict';
    
    var angular = window.angular;
    
    angular.module('pttr.animal').service('AnimalService', ['$firebaseObject', 'FirebaseRefFactory', function ($firebaseObject, FirebaseRefFactory) {
        
        var animalsNodeReference = FirebaseRefFactory.child("animals"),
            sheltersNodeReference = FirebaseRefFactory.child("shelters"),
            individualsNodeReference = FirebaseRefFactory.child("individuals");
        
        this.getAnimals = function () {
            return animalsNodeReference;
        };
        
        this.getAnimal = function (animalId) {
          return animalsNodeReference.child(animalId);  
        };
        
    }]);
    
}(window));