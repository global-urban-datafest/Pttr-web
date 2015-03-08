(function (window) {
    'use strict';
    
    var angular = window.angular;
    
    angular.module('pttr.individual').controller('DashboardIndividualCtrl', ['$scope', 'AnimalService', function ($scope, AnimalService) {
        $scope.liked = false;
        $scope.animals = [
        	{
        		name: "monkey",
        		type: "beast",
        		description: "Donkey kong like animal"
        	},
        	{
        		name: "monkey",
        		type: "beast",
        		description: "Donkey kong like animal"
        	},
        	{
        		name: "monkey",
        		type: "beast",
        		description: "Donkey kong like animal"
        	},
        	{
        		name: "monkey",
        		type: "beast",
        		description: "Donkey kong like animal"
        	},
        	{
        		name: "monkey",
        		type: "beast",
        		description: "Donkey kong like animal"
        	},
        	{
        		name: "monkey",
        		type: "beast",
        		description: "Donkey kong like animal"
        	},
        	{
        		name: "monkey",
        		type: "beast",
        		description: "Donkey kong like animal"
        	},
        	{
        		name: "monkey",
        		type: "beast",
        		description: "Donkey kong like animal"
        	},
        	{
        		name: "monkey",
        		type: "beast",
        		description: "Donkey kong like animal"
        	}

        ]
        
        
       
        // var viewAnimal = function(name,type){

        // };
    }]);
    
}(window));