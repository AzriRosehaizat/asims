application.controller('toDoListController', function($scope, user, $http) {
    var userid = user.data.id;
    $scope.toDoListForm = {};

    $scope.hoverIn = function() {
        this.hoverEdit = true;
    }

    $scope.hoverOut = function() {
        this.hoverEdit = false;
    }

    var getUrl = 'ToDoList?userid=' + userid;
    $http.get(getUrl)
        .success(function(data) {
            $scope.list = data;
        });

    $scope.addItem = function() {
        $http.post('/ToDoList/create?text=' + $scope.addToDoText + '&userid=' + userid)
            .then(function(data) {
                console.log($scope.addToDoText);
                $scope.addToDoText = '';
                $http.get(getUrl)
                    .success(function(data) {
                        $scope.list = data;
                    });
            });
    }

    $scope.checkItem = function(item) {
        var id = item.id;
        var state = item.state;
        var currentState = !state;
        $http.put('ToDoList/update/' + id + '?state=' + currentState)
            .then(function(data) {})
    }

    $scope.deleteItem = function(id) {
        $http.delete('ToDoList/' + id)
            .then(function(data) {
                $http.get(getUrl)
                    .success(function(data) {
                        $scope.list = data;
                    });
            });
    }

    $scope.deleteCompleted = function(item) {

    }
})