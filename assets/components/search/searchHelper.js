application.service('SearchHelper', function($filter) {

    var searchModel, input, grid, model;
    
    // To modify search input in the top nav-bar
    this.setSearch = function(model) {
        searchModel = model;
    };

    this.setInput = function(data) {
        input = data;

        if (grid && model) search();
    };
    
    this.init = function(gridOptions, modelObj) {
        grid = gridOptions;
        model = modelObj;
    };
    
    this.reset = function() {
        this.init(null, null);
        input = "";
        if (searchModel) searchModel.data = "";
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