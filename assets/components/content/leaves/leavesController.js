/* global
    application
*/

application
.controller(
    'leavesController', 
    function( 
        $scope, 
        staff, 
        leavesService,
        leavesTabs,
        SearchHelper, 
        toaster
    ){

    $scope
    .gridTitle = 'Leaves';
    
    $scope
    .gridOptions = (
        leavesService
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
            
            leavesTabs
            .getTabs(
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
        leavesTabs
        .tabs
    );
    
    
    $scope
    .formData = {
    };
    
    
    
});