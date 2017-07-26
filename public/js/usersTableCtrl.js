app.controller("usersTableCtrl", function($scope, $http) {
    $scope.userArr = {};
    $http.get("/api/get-users")
        .then(function success(resp) {
            console.log(resp.data);//add if condition to check data
            $scope.userArr = resp.data;
        },
        function error(err) {
            console.log("Error returned: " + err.data);
        });
    $scope.$on("updatedUserArray", function(event, data) {
        console.log("User array updated!");
        $scope.userArr = data;
    });
});