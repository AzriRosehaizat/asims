application.controller('toDoListController', function($scope, user, $http) {
    $scope.user = user.data;
    $scope.toDoListForm = {};
    
    $scope.hoverIn = function(){
        this.hoverEdit = true;
    }
    
    $scope.hoverOut = function(){
        this.hoverEdit = false;
    }
    
    $http.get('/ToDoList')
        .success(function(data) {
            $scope.list = data;
        });

    $scope.addItem = function() {
        http.post('/ToDoList/create', $scope.toDoListForm)
            .success(function(data) {
                $scope.list = data;
            });
    }
})