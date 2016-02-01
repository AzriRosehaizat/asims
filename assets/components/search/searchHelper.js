application.service('SearchHelper', function() {
    
    var input = {};
    
    this.search = {
        get input() {
            return input;
        },
        set input(data) {
            input = data;
        }
    };
    
    return this.search;
});