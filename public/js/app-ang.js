var app = angular.module("userAgeApp", ['ui.router']);
app.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
});
