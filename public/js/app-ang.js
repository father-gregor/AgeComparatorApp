var app = angular.module("ageComparatorApp");
app.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
});
