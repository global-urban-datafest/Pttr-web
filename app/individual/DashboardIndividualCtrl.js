(function (window) {
    'use strict';
    
    var angular = window.angular;

    angular.module('pttr.individual').controller('DashboardIndividualCtrl', ['$scope', '$http', function ($scope,$http) {
        $http.get('js/animalinfo.json').success(function(data){
        		$scope.animals = data;
        });
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