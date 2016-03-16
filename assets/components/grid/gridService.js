application.service('gridService', function($timeout, _, LocalService) {

    var self = this;
    var $scope, main, states;

    self.gridApi = {};

    // For main grid
    self.setMain = function(scope, gridApi, mainKey) {
        $scope = scope;
        main = mainKey;
        self.set(gridApi, mainKey);
    };

    self.set = function(gridApi, key) {
        self.gridApi[key] = gridApi;
        // Restore previous settings
        restore(key);
    };

    // Save current gridApi states in local storage
    self.saveAndReset = function() {
        if (_.isEmpty(self.gridApi)) return;
        else {
            states = {};

            _.forEach(self.gridApi, function(gridApi, key) {
                var state = gridApi.saveState.save();
                states[key] = state;
            });

            LocalService.set(main, JSON.stringify(states));
            reset();
        }
    };

    function reset() {
        self.gridApi = {};
        states = null;
        main = null;
    }

    function restore(key) {
        // If no states, get from local storage. If null, return.
        if (!states) states = JSON.parse(LocalService.get(main));
        if (!states) return;

        $timeout(function() {
            var state = states[key];
            if (state) self.gridApi[key].saveState.restore($scope, state);
        });
    }
});