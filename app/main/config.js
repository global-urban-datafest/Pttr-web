(function (window) {
    'use strict';
    
    var angular = window.angular,
        app = angular.module('pttr', ['ngRoute', 'pttr.userEntity', 'pttr.individual', 'pttr.shelter', 'pttr.dog']);
    
    app.run(['$rootScope', '$location', function ($rootScope, $location) {
        
    }]);
    
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "js/main/home.html"
            })
            // UserEntity Module
            .when('/login/individual', {
                templateUrl: "js/userEntity/loginIndividual.html",
                controller: "LoginIndividualCtrl"
            })
            .when('/login/animalShelter', {
                templateUrl: "js/userEntity/loginShelter.html",
                controller: "LoginShelterCtrl"
            })
            .when('/login', {
                redirectTo: '/login/individual'
            })
            .when('/create/individual', {
                templateUrl: "js/userEntity/createIndividual.html",
                controller: "CreateIndividualCtrl"
            })
            .when('/create/animalShelter', {
                templateUrl: "js/userEntity/createShelter.html",
                controller: "CreateShelterCtrl"
            })
            .when('/create/', {
                redirectTo: '/create/individual'
            })
            // Individual Module
            .when('/individual/dashboard', {
                templateUrl: "js/individual/dashboard.html",
                controller: "DashboardIndividualCtrl"
            })
            .when('/individual/edit', {
                templateUrl: "js/individual/edit.html",
                controller: "EditIndividualCtrl"
            })
            // Shelter Module
            .when('/shelter/dashboard', {
                templateUrl: "js/shelter/dashboard.html",
                controller: "DashboardShelterCtrl"
            })
            .when('/shelter/edit', {
                templateUrl: "js/shelter/edit.html",
                controller: "EditShelterCtrl"
            })
            .when('/shelter/adoptions', {
                templateUrl: "js/shelter/adoptions.html",
                controller: "AdoptionShelterCtrl"
            })
            .when('/shelter/pledges', {
                templateUrl: "js/shelter/pledges.html",
                controller: "PledgeShelterCtrl"
            })
            .when('/shelter/:animalShelterId', {
                templateUrl: "js/shelter/about.html",
                controller: "AboutShelterCtrl"
            })
            // Dog Module
            .when('/dog/:dogId', {
                templateUrl: "js/dog/about.html",
                controller: "AboutDogCtrl"
            })
            .when('/dog/:dogId/adopt', {
                templateUrl: "js/dog/adopt.html",
                controller: "AdoptDogCtrl"
            })
            .when('/dog/:dogId/pledge', {
                templateUrl: "js/dog/pledge.html",
                controller: "PledgeDogCtrl"
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
    
}(window));