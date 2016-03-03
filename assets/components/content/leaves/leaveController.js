/* global
    application
*/

application
.controller(
    'leaveController', 
    function( 
        $scope, 
        staff, 
        leaveService,
        leaveTabs,
        SearchHelper, 
        toaster
    ){
    
    $scope
    .formData = {
    };
    
    $scope
    .gridTitle = 'Leaves';
    
    $scope
    .gridOptions = (
        leaveService
        .gridOptions
    );
    
    $scope
    .gridOptions
    .data = (
        staff
        .data
    );
    
    leaveService
    .setForm(
        $scope
        .formData,
        $scope
        .gridOptions
        .data,
        {
            entity:
                { 
                    firstName: '',
                    lastName: ''
                }
        }
    );
    
    $scope
    .gridOptions
    .onRegisterApi = function( gridApi ) {
        $scope
        .gridApi = (
            gridApi
        );
        
        gridApi
        .selection
        .on
        .rowSelectionChanged( $scope, function( row ) {
            $scope
            .row = (
                row
            );
            
            leaveService
            .setForm(
                $scope
                .formData,
                $scope
                .gridOptions
                .data,
                row
            );
            
            leaveTabs
            .initializeTabs(
                $scope
                .tabs,
                row
            );
        });
        
        modifyRows();
        
        selectRow( 
            $scope
            .gridOptions
            .data[0]
        );
    };
    
    SearchHelper
    .init(
        $scope
        .gridOptions, 
        $scope
        .gridOptions
        .data
    );
    
    $scope
    .tabs = (
        leaveTabs
        .tabs(
            $scope
        )
    );
    
    $scope
    .selectTab = function( tab ) {
        $scope
        .addTabRow = function(){
            if(!$scope.row){
                toaster.info("Select a row first in the main table.");
                return;
            }
            
            tab
            .initializeAdd(
                $scope.formData,
                tab.gridOptions.data,
                $scope.row
            );    
        };
        
        $scope
        .editTabRow = function(){
            if(!$scope.tabRow){
                toaster.info("Select a row first in the tab table.");
                return;
            }
            
            tab
            .initializeEdit(
                $scope.formData,
                tab.gridOptions.data,
                $scope.tabRow
            );
        };
    };
    
    $scope
    .selectTab(
        $scope
        .tabs[ 
            Object
            .keys(
                $scope
                .tabs
            )[0]
        ]
    );
    
    
    function modifyRows(){
        $scope
        .gridApi
        .grid
        .modifyRows( 
            $scope
            .gridOptions
            .data 
        );
    }

    function selectRow( row ){
        $scope  
        .gridApi
        .selection
        .selectRow( 
            row 
        );
    }    
});