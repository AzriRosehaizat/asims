/* global
    application
*/

application
.service(
    'leavesCredits', 
    function(
        $http, 
        _, 
        formService
    ){
        return {
            gridOptions : {
                columnDefs: []
            }
        };
    }
);