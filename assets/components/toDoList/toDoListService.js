application.service('toDoListService', function($http){
    return {
        getList: function(userid) {
        var getUrl = 'ToDoList?userid=' + userid;
        var list;
        $http.get(getUrl)
            .success(function(data) {
                list = data;
            });
        return list;
    }
    }
})