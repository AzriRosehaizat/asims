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
    .formData = {
    };
    
    $scope
    .tabs = (
        leavesTabs
        .tabs
    );
    
});