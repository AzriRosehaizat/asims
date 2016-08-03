application.service('SearchHelper', ['$filter', function($filter) {

    var input, grid, model;
    var self = this;
    self.data = "";

    self.init = function(gridOptions, modelObj) {
        grid = gridOptions;
        model = modelObj;
    };

    self.reset = function() {
        self.init(null, null);
        if (self.data) self.data = "";
    };
    
    self.set = function(data) {
        self.data = data;
        self.search();
    };

    self.search = function() {
        input = self.data;
        if (grid && model) searchData();
    };

    function searchData() {
        grid.data = model;

        while (input) {
            var searchArray = input.split(' ');
            grid.data = $filter('filter')(grid.data, searchArray[0], undefined);
            searchArray.shift();
            input = (searchArray.length !== 0) ? searchArray.join(' ') : '';
        }
    }
}]);