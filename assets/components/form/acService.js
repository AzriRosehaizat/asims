application.service('acService', function($http, _) {

    this.querySearch = function(formData, searchText, url, output) {
        var query = url.start;
        if (url.where) {
            _.forEach(url.where, function(where) {
                var value = _.get(formData.model, where.value);
                query += "\"" + where.key + "\":\"" + value + "\",";
            });
        }
        query += url.end + searchText + "\"}}";
        // console.log(query);

        return $http.get(query)
            .then(function(res) {
                return _.map(res.data, function(item) {
                    var result = {
                        obj: item,
                        name: item[output.name]
                    };
                    // For the custom autocomplete template
                    if (output.meta) {
                        result.meta = [];
                        _.forEach(output.meta, function(meta) {
                            result.meta.push({
                                tag: meta.tag,
                                name: item[meta.name]
                            });
                        });
                    }
                    return result;
                });
            });
    };

    this.resetValue = function(formData, resetArr) {
        _.forEach(resetArr, function(reset) {
            _.set(formData.model.searchText, reset, undefined);
        });
    };

    this.assignValue = function(formData, assignArr) {
        _.forEach(assignArr, function(assign) {
            // Update disabled value from another attribute
            if (assign.from && assign.to) {
                var value = _.get(formData.model, assign.from);
                _.set(formData.model, assign.to, value);
            }
            else console.log("assignValue: from or to is missing.");
        });
    };
});