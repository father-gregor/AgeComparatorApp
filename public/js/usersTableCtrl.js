angular.controller("usersTableCtrl", function($scope) {
    $scope.usersArr = {};
    $http.get("/api/get-users")
        .success(function(data) {
            $scope.usersArr = data;
        })
        .error(function (err) {
            console.log("Error returned: " + err);
        });
});