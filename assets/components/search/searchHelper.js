application.service('SearchHelper', function($filter) {

    var search, input, grid, model;
    
    // To modify search input in the top nav-bar
    this.setSearch = function(searchObj) {
        search = searchObj;
    };

    this.setInput = function(data) {
        input = data;
        if (grid && model) searchData();
    };
    
    this.init = function(gridOptions, modelObj) {
        grid = gridOptions;
        model = modelObj;
    };
    
    this.reset = function() {
        this.init(null, null);
        if (search) search.data = "";
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
});