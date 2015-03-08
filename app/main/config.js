(function (window) {
    'use strict';
    
    var angular = window.angular,
        app = angular.module('pttr', ['ui.router', 'firebase', 'firebaseRef', 'pttr.userEntity']);
    
    app.run(['$rootScope', '$state', 'AuthService', function ($rootScope, $state, AuthService) {

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams) {
            var stateNamingSplit = toState.name.split(".");
            if (stateNamingSplit[0] === "individualAuth" && AuthService.getUser() && AuthService.getUser().type !== "individual") {
                event.preventDefault();
            }
            if (stateNamingSplit[0] === "shelterAuth" && AuthService.getUser() && AuthService.getUser().type !== "shelter") {
                event.preventDefault();
            }
        });
        
    }]);
    
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        
        $stateProvider
            .state('noAuth', {
                abstract: true,
                templateUrl: "app/main/menu.html"
            })
            .state('noAuth.home', {
                url: "/home",
                templateUrl: "app/main/home.html"
            })
            .state('noAuth.contact', {
                url: "/contact",
                templateUrl: "app/main/contact.html"
            })
            .state('noAuth.loginIndividual', {
                url: "/login?type=individual",
                templateUrl: "app/userEntity/loginIndividual.html",
                controller: "LoginCtrl"
            })
            .state('noAuth.loginShelter', {
                url: "/login?type=shelter",
                templateUrl: "app/userEntity/loginShelter.html",
                controller: "LoginCtrl"
            })
            .state('noAuth.createIndividual', {
                url: "/create?type=individual",
                templateUrl: "app/userEntity/createIndividual.html",
                controller: "CreateCtrl"
            })
            .state('noAuth.createShelter', {
                url: "/create?type=shelter",
                templateUrl: "app/userEntity/createShelter.html",
                controller: "CreateCtrl"
            })
            .state('noAuth.viewIndividual', {
                url: "/view/individual/:individualId",
                templateUrl: "app/individual/view.html",
                controller: "ViewIndividualCtrl"
            })
            .state('noAuth.viewShelter', {
                url: "/view/shelter/:shelterId",
                templateUrl: "app/shelter/view.html",
                controller: "ViewShelterCtrl"
            })
            .state('noAuth.viewDog', {
                url: "/view/dog/:dogId",
                templateUrl: "app/dog/view.html",
                controller: "ViewDogCtrl"
            });
            
        
        $stateProvider
            .state('individualAuth', {
                abstract: true,
                templateUrl: "app/userEntity/menuIndividual.html"
            })
            .state('individualAuth.dashboard', {
                url: "/dashboard",
                templateUrl: "app/individual/dashboard.html",
                controller: "DashboardIndividualCtrl"
            });
        
        $stateProvider
            .state('shelterAuth', {
                abstract: true,
                templateUrl: "app/userEntity/menuShelter.html"
            })
            .state('shelterAuth.dashboard', {
                url: "/dashboard",
                templateUrl: "app/shelter/dashboard.html",
                controller: "DashboardShelterCtrl"
            });
        
        $urlRouterProvider.otherwise('/home');
            
    }]);
    
}(window));