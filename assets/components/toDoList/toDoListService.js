application.service('toDoListService', function($http) {
    return {
        getList: function(userid) {
            var getUrl = 'ToDoList?userid=' + userid;
            $http.get(getUrl)
                .success(function(data) {
                    return data;
                });
        }
    }
})