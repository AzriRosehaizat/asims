this["JST"] = this["JST"] || {};

this["JST"]["assets/templates/todo.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="container" ng-controller="TodoCtrl">\n    <div class="jumbotron">\n        <h1 align="center">Todo Application</h1>\n        <br>\n        <div id="todo-form" class="row">\n            <div class="col-sm-8 col-sm-offset-2 text-center">\n                <form>\n                    <div class="form-group">\n                        <input type="text" class="form-control input-lg text-center" placeholder="Add Todo!" ng-model="formData.value">\n                        <br>\n                        <button type="submit" class="btn btn-primary btn-lg" ng-click="addTodo()">Add Todo</button>\n                    </div>\n                </form>\n            </div>\n        </div>\n    </div>\n    <div id="todo-list" class="row">\n        <div class="col-sm-4 col-sm-offset-4">\n            <div class="checkbox" ng-repeat="todo in todos">\n                <label>\n                    <input type="checkbox" ng-click="removeTodo(todo)">\n                    {{ todo.value }}\n                </label>\n            </div>\n        </div>\n    </div>\n</div>';

}
return __p
};