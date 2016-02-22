application.controller('formController', function($http, _) {

    this.querySearch = function(query, url, output) {
        return $http.get(url + query + "\"}}")
            .then(function(res) {
                return _.map(res.data, function(item) {
                    return {
                        id: item[output.id],
                        name: item[output.name]
                    };
                });
            });
    };
    
    this.redirect = function(link) {
        console.log(link);    
    };
});