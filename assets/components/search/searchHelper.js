application.service('SearchHelper', function($filter) {

    var input, grid, model;

    this.setInput = function(data) {
        input = data;

        if (grid && model) search();
    };
    
    this.init = function(gridOptions, modelObj) {
        grid = gridOptions;
        model = modelObj;
    };

    function search() {
        grid.data = model;
        
        while (input) {
            var searchArray = input.split(' ');
            grid.data = $filter('filter')(grid.data, searchArray[0], undefined);
            searchArray.shift();
            input = (searchArray.length !== 0) ? searchArray.join(' ') : '';
        }
    }
});