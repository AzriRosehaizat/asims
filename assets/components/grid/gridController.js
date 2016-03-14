application
    .controller('gridController', function(navRightBarService, CurrentUser) {
    
        var self = this;
        var userRole;
        
        self.toggle = function() {
            navRightBarService.toggle();
        };
        
        self.isReader = function() {
            if (!userRole) userRole = CurrentUser.getRole();
            return (userRole === "reader");    
        };
    
    })
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
				
				initOptions
				.onRegisterApi = (function( callback ){
					return function( gridApi ){
		                // call the onRegisterApi defined in the page service  
		                callback
						.call( initOptions, gridApi );
						
						//get the list of onRowSelectionHandlers
		                var onRowSelectionHandlers = (
		                	gridApi
		                	.listeners
		                	.filter(function( value ){
		                		return value
		                		.eventId
		                		.indexOf(
		                			'selectionrowSelectionChanged'
		                		) != -1;
		                	})
		                );
		                
		                //deregister all of them
		                for( var k in onRowSelectionHandlers){
		                	onRowSelectionHandlers[k]
		                	.dereg();
		                }
		                
		                //register our own rowSelectionHandler
						gridApi
						.selection
						.on
						.rowSelectionChanged( null, function( row ){
							//test if deselection
							var index = (
		                        gridApi
		                        .selection
		                        .getSelectedRows()
		                        .indexOf(
		                            row
		                            .entity
		                        )
		                    );
                    		
                    		//reselect the row and return if deselection
			                if(index === -1){
			                    gridApi
			                    .selection
			                    .selectRow( 
			                        row.entity 
			                    );  
			                    return;
			                }
			                
			                //call all the rowSelectionHandlers if seelection event
			                for( var k in onRowSelectionHandlers){
			                	onRowSelectionHandlers[k]
			                	.handler( row );
		                	}
						});
					};
				})( initOptions.onRegisterApi );
				
				return initOptions;
			};
			return gridOptions;
		});
	});