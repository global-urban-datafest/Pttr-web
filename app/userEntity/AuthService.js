/**
    @ngdoc service
    @name AuthService
    @description Angular Service that handles authenticating the user.
*/
(function (window) {
    'use strict';
    
    var angular = window.angular;
        
    angular.module('pttr.userEntity').service('AuthService', ['$q', '$firebaseAuth', '$firebaseObject', 'FirebaseRefFactory', function ($q, $firebaseAuth, $firebaseObject, FirebaseRefFactory) {
        
        /**
            @memberof AuthService
            @var {Object|Null} user
            @description Object representation of the user. Object if the user is logged in, Null if not logged in 
            @private
        */
        var user = {
            email: null,
            firebaseRef: null,
            type: null
        };
        
        /**
            @memberof AuthService
            @description Helper function that logs in a user of a specific type
            @returns {HttpPromise} Promise resolved on success, rejected on failure
            @private
        */
        function login(email, password, type) {
            var deferred = $q.defer();
            if (!email || !password) {
                deferred.reject('Username and/or Password was not provided.');
                return deferred.promise;
            }
            if (!type || !angular.isString(type)) {
                deferred.reject('User type was not provided.');
                return deferred.promise;
            }
            if (type !== "individual" && type !== "shelter") {
                deferred.reject("User type was not valid.");
                return deferred.promise;
            }
            $firebaseAuth(FirebaseRefFactory)
                .$authWithPassword({
                    email: email,
                    password: password
                })
                .then(
                    function (authData) {
                        user.email = email;
                        user.type = type;
                        if (type === "individual") {
                            user.firebaseRef = $firebaseObject(FirebaseRefFactory.child('individuals/' + authData.uid));
                        } else if (type === "shelter") {
                            user.firebaseRef = $firebaseObject(FirebaseRefFactory.child('shelters/' + authData.uid));
                        }
                        return user.firebaseRef.$loaded();
                    },
                    function (error) {
                        deferred.reject('Firebase Error: ' + error);
                    }
                ).then(
                    function () {
                        deferred.resolve('Succesfully logged in.');
                    }
                );
            return deferred.promise;
        }
        
        /**
            @memberof AuthService
            @description Helper function that creates a user of a specific type
            @returns {HttpPromise} Promise resolved on success, rejected on failure
            @private
        */
        function register(email, password, registrationInfo, type) {
            var deferred = $q.defer();
            if (!email || !password) {
                deferred.reject('An email and/or password must be provided to create an account.');
            }
            if (!type || !angular.isString(type)) {
                deferred.reject('User type was not provided.');
            }
            if (type !== "individual" && type !== "shelter") {
                deferred.reject('User type was not valid.');
            }
            if (!registrationInfo.name || !registrationInfo.address || !registrationInfo.phone) {
                deferred.reject('Registration Information not present');
            }
            $firebaseAuth(FirebaseRefFactory)
                .$createUser({
                    email: email,
                    password: password
                }).then(function (userData) {
                    var accountObject = {};
                    accountObject[userData.uid] = {
                        name: registrationInfo.name,
                        address: registrationInfo.address,
                        email: email,
                        phone: registrationInfo.phone
                    };
                    if (type === "individual") {
                        FirebaseRefFactory.child('/individuals').set(accountObject);
                    } else if (type === "shelter") {
                        FirebaseRefFactory.child('/shelters').set(accountObject);
                    }
                });
            return deferred.promise;
        }
        
        /**
            @memberof AuthService
            @description Logs in a user of type Individual
            @returns {HttpPromise} Promise as resolved or rejected by login() private function
        */
        this.loginIndividual = function (email, password) {
            return login(email, password, 'individual');
        };
        
        /**
            @memberof AuthService
            @description Logs in a user of type Shelter
            @returns {HttpPromise} Promise as resolved or rejected by login() private function
        */
        this.loginShelter = function (email, password) {
            return login(email, password, 'shelter');
        };
        
        /**
            @memberof AuthService
            @description Logs out the currently logged in user
        */
        this.logout = function () {
            $firebaseAuth(FirebaseRefFactory)
                .$unauth();
            user = {
                email: null,
                firebaseRef: null,
                type: null
            };
        };
        
        /**
            @memberof AuthService
            @description Registers a user of type Individual
            @returns {HttpPromise} Promise as resolved or rejected by register() private function
        */
        this.registerIndividual = function (email, password, registrationInfo) {
            return register(email, password, registrationInfo, "individual");
        };
        
        /**
            @memberof AuthService
            @description Registers a user of type Shelter
            @returns {HttpPromise} Promise as resolved or rejected by register() private function
        */
        this.registerShelter = function (email, password, registrationInfo) {
            return register(email, password, registrationInfo, "shelter");
        };
        
        /**
            @memberof AuthService
            @description Gets the currently logged in user
            @returns {Object|Null} Object if a user is logged in, Null if not
        */
        this.getUser = function () {
            if (user.email === null || user.firebaseRef === null || user.type === null) {
                return null;
            }
            return user;
        };
        
        /**
            @memberof AuthService
            @description Determines whether a user is logged in or not
            @returns {Boolean} True if logged in, False if not.
        */
        this.isLoggedIn = function () {
            if (user.email === null || user.firebaseRef === null || user.type === null) {
                return false;
            }
            return true;
        };
        
    }]);
    
    
}(window));