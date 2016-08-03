application.config(['$mdDateLocaleProvider', 'moment', function($mdDateLocaleProvider, moment) {
    
    $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('MM-DD-YYYY');
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'MM-DD-YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
}]);