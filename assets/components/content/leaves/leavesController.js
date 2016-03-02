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
    
});