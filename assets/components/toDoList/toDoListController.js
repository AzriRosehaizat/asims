application.controller('toDoListController', function($scope, user, $http) {
    var userid = user.data.id;
    $scope.toDoListForm = {};
    
    $scope.hoverIn = function(){
        this.hoverEdit = true;
    }
    
    $scope.hoverOut = function(){
        this.hoverEdit = false;
    }
    
    var getUrl = 'ToDoList?userid=' + userid;
    $http.get(getUrl)
        .success(function(data) {
            $scope.list = data;
        });

    $scope.addItem = function() {
        $http.post('/ToDoList/create?' + $scope.toDoListForm)
            .success(function(data) {
                $scope.list = data;
            });
    }
    
    $scope.deleteItem = function(item){
        $http.delete('ToDoList/' + item)
            .then(function(data){
                console.log('Item Deleted');
                $http.get(getUrl)
                    .success(function(data){
                        $scope.list = data;
                    });
            });
    }
})