var app = angular.module("userAgeApp", ['ui.router']);
app.config(function($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
});
