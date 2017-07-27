app.controller("userFormCtrl", function($scope, $http, $rootScope) {
    $scope.user = {};
    $scope.genders = ["Male", "Female"];
    $scope.sendUserForm = function() {
        if($scope.userform.$valid && $scope.userform.$dirty) {
            $http.post("/api/add-user", $scope.user)
                .then(function success(resp) {
                        $rootScope.$broadcast("updatedUserArray", resp.data);
                    },
                    function error(err) {
                        console.log("Data submit error: " + err);
                    });
        }
    }
});