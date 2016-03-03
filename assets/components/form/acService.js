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

    this.changeValue = function(formData, change) {
        if (change) {
            // Update disabled value from another attribute
            if (change.from && change.to) {
                var value = _.get(formData.model, change.from);
                _.set(formData.model, change.to, value);
            }
            // Reset input value on change of another input
            if (change.reset) {
                _.set(formData.model.searchText, change.reset, undefined);
            }
        }
    };
});