/**
    @ngdoc service
    @name IndividualService
    @description Handles getting the information of a specific individual as well as that individual's related data set of information.
*/
(function (window) {
    'use strict';
    
    var angular = window.angular;
    
    angular.module('pttr.individual').service('IndividualService', ['FirebaseRefFactory', '$firebaseObject', '$firebaseArray', '$q', function (FirebaseRefFactory, $firebaseObject, $firebaseArray, $q) {
        
        var individualsNodeReference = FirebaseRefFactory.child('individuals'),
            pledgesNodeReference = FirebaseRefFactory.child('pledges');
        
        this.getIndividuals = function () {
            return $firebaseObject(individualsNodeReference);
        };
        
        this.getIndividual = function (individualId) {
            return $firebaseObject(individualsNodeReference.child(individualId));
        };
        
        this.getPledges = function (individualId) {
            var defer = $q.defer();
            this.getIndividual(individualId).$loaded().then(function (individual) {
                return individual.hasPledges;
            }, function (error) {
                defer.reject('Firebase Error: ' + error);
            }).then(function (pledgeIds) {
                var i,
                    pledgeStack = [];
                for (i = 0; i < pledgeIds.length; i + 1) {
                    pledgeStack.push($firebaseObject(FirebaseRefFactory.child('pledges').child(pledgeIds[i])).$loaded()); 
                }
                defer.resolve($q.all(pledgeStack));
            });
            return defer.promise;
        };
        
        this.getAnimals = function (individualId) {
            var defer = $q.defer();
            this.getIndividual(individualId).$loaded().then(function (individual) {
                return individual.hasAnimals;
            }, function (error) {
                defer.reject('Firebase Error: ' + error);
            }).then(function (animalIds) {
                var i,
                    animalStack = [];
                for (i = 0; i < animalIds.length; i + 1) {
                    animalStack.push($firebaseObject(FirebaseRefFactory.child('animals').child(animalIds[i])).$loaded());
                }
                defer.resolve($q.all(animalStack));
            });
            return defer.promise;
        };
        
    }]);
    
    
}(window));