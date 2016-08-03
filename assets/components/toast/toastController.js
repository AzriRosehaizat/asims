application.controller('toastController', ['$scope', 'type', 'text', function($scope, type, text) {

    $scope.type = type;
    $scope.text = text;
}]);