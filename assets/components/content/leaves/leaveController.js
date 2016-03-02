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
    .formData = {
    };

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
