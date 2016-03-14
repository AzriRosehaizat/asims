application
    .config(function($provide) {
        $provide.decorator('GridOptions', function($delegate, uiGridConstants) {
            var gridOptions;
            gridOptions = angular.copy($delegate);
            gridOptions.initialize = function(options) {
                var initOptions;
                initOptions = $delegate.initialize(options);
                //set global options
                //don't need header menus if we are using the speed dial
                initOptions.enableColumnMenus = false;
                initOptions.enableGridMenu = true;
                initOptions.enableColumnResizing = true;
                initOptions.noUnselect = true;
                initOptions.multiSelect = false;
                initOptions.enableRowHeaderSelection = false;
                initOptions.enableHorizontalScrollbar = 0;
                initOptions.exporterMenuPdf = false;
                initOptions.gridMenuCustomItems = [{
                    title: 'Toggle Filters',
                    icon: 'ui-grid-icon-filter',
                    action: function($event) {
                        initOptions.enableFiltering = (!initOptions.enableFiltering);
                        this.grid.api.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
                    },
                    order: 1
                }];
                return initOptions;
            };
            return gridOptions;
        });
    });