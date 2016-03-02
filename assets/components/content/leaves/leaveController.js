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
        gridApi
        .selection
        .on
        .rowSelectionChanged( $scope, function( row ) {
            $scope
            .row = (
                row
            );
            
            $scope
            .tabRow = (
                null
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
        .tabs
    );
    
    
    $scope
    .formData = {
    };
    
});