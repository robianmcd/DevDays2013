/// <reference path="./AllDefs.ts" />


'use strict';

console.log("Initializing Angular App.");

var appModule: ng.IModule = angular.module('GuestBookApp', ['ngCookies', '$strap.directives']);

appModule.factory("UserSessionService",
    ($cookieStore: ng.cookies.ICookieStoreService) =>
    {
        return new UserSessionService($cookieStore);
    }
);

appModule.config([<any>'$routeProvider', function (routeProvider: any) {
    routeProvider.when('/SignIn', { templateUrl: '/client/views/signIn.html', controller: 'SignInCtrl as ctrl' });
    routeProvider.when('/GuestBook', { templateUrl: '/client/views/guestBook.html', controller: 'GuestBookCtrl as ctrl' });
    routeProvider.otherwise({ redirectTo: '/SignIn' });
}]);

console.log("Finished Initializing Angular App.");