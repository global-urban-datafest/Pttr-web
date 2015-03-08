(function (window) {
    'use strict';

    var angular = window.angular,
        app = angular.module('pttr', ['ui.router', 'ui.bootstrap', 'ngRoute', 'firebase', 'pttr.firebaseRef',
                                      'pttr.userEntity', 'pttr.shelter', 'pttr.animal', 'pttr.individual']);

    app.run(['$rootScope', '$state', 'AuthService', function ($rootScope, $state, AuthService) {

        AuthService.login().then(function () {
            // Based on the logged in state of the user, redirect him/her to appropriate starting page
            if (AuthService.isLoggedIn()) {
                if (AuthService.getUser().type === "individual") {
                    $state.go('individualAuth.dashboard');
                } else if (AuthService.getUser().type === "shelter") {
                    $state.go('shelterAuth.dashboard');
                }
            }

        }, function () {
            $state.go('noAuth.home');
        });
        
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams) {
            var stateNamingSplit = toState.name.split(".");
            // NoAuth route but user is logged in and wants to access such routes. Stop them!
            if (stateNamingSplit[0] === "noAuth" && AuthService.getUser() &&
                    (AuthService.getUser().type === "individual" || AuthService.getUser().type === "shelter")) {
                event.preventDefault();
            }
            // individualAuth route but user is not an individual. Stop them!
            if (stateNamingSplit[0] === "individualAuth" &&
                    ((AuthService.getUser() && AuthService.getUser().type !== "individual") || !AuthService.getUser().hasOwnProperty('type'))) {
                event.preventDefault();
            }
            // shelter route but user is not a shelter. Stop Them
            if (stateNamingSplit[0] === "shelterAuth" &&
                    ((AuthService.getUser() && AuthService.getUser().type !== "shelter") || !AuthService.getUser().hasOwnProperty('type'))) {
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
                url: "/login/individual",
                templateUrl: "app/userEntity/loginIndividual.html",
                controller: "LoginCtrl"
            })
            .state('noAuth.loginShelter', {
                url: "/login/shelter",
                templateUrl: "app/userEntity/loginShelter.html",
                controller: "LoginCtrl"
            })
            .state('noAuth.createIndividual', {
                url: "/create/individual",
                templateUrl: "app/userEntity/createIndividual.html",
                controller: "CreateCtrl"
            })
            .state('noAuth.createShelter', {
                url: "/create/shelter",
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
                controller: "IndividualAuthCtrl",
                templateUrl: "app/userEntity/menuIndividual.html"
            })
            .state('individualAuth.dashboard', {
                url: "/dashboard/individual",
                templateUrl: "app/individual/dashboard.html",
                controller: "DashboardIndividualCtrl"
            })
            .state('individualAuth.editProfile', {
                url: "/edit/individual",
                templateUrl: "app/individual/view.html",
                controller: "EditIndividualCtrl"
            });

        $stateProvider
            .state('shelterAuth', {
                abstract: true,
                controller: "ShelterAuthCtrl",
                templateUrl: "app/userEntity/menuShelter.html"
            })
            .state('shelterAuth.dashboard', {
                url: "/dashboard/shelter",
                templateUrl: "app/shelter/dashboard.html",
                controller: "DashboardShelterCtrl"
            })
            .state('shelterAuth.editProfile', {
                url: "/edit/shelter",
                templateUrl: "app/shelter/view.html",
                controller: "EditIndividualCtrl"
            });

        $urlRouterProvider.otherwise('/home');

    }]);

}(window));