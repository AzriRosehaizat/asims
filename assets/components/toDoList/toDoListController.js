application.controller('toDoListController', function($scope, user, $http, _, toDoListService) {

    var userid = user.data.id;
    $scope.formData = {};

    $scope.hoverIn = function() {
        this.hoverEdit = true;
    };

    $scope.hoverOut = function() {
        this.hoverEdit = false;
    };

    // $scope.list = toDoListService.getList(userid);

    var getUrl = 'ToDoList?userid=' + userid;
    $http.get(getUrl)
        .success(function(data) {
            $scope.list = data;
            console.log(data);
        });

    $scope.addItem = function() {
        $http.post('/ToDoList/create?text=' + $scope.addToDoText + '&userid=' + userid)
            .then(function(res) {
                $scope.addToDoText = '';
                $scope.formData.form.$setPristine();
                $scope.formData.form.$setUntouched();
                
                $http.get(getUrl)
                    .success(function(data) {
                        $scope.list = data;
                    });
            });
    };

    $scope.checkItem = function(item) {
        var id = item.id;
        var state = item.state;
        var currentState = !state;
        
        $http.put('ToDoList/update/' + id + '?state=' + currentState)
            .then(function(res) {});
    };

    $scope.deleteItem = function(id) {
        $http.delete('ToDoList/' + id)
            .then(function(res) {
                $http.get(getUrl)
                    .success(function(data) {
                        $scope.list = data;
                    });
            });
    };

    $scope.deleteCompleted = function() {
        // select items with state==true
        // and wrap in an object.
        var completed = _.filter($scope.list, 'state');
        completed = {list: completed};

        $http.post('/ToDoList/deleteCompleted', completed)
            .then(function(res) {
                $http.get(getUrl)
                    .success(function(list) {
                        $scope.list = list;
                    });
            });
    };
})