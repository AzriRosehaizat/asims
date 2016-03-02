/* global
    application
*/

application
.service(
    'leaveTabs', 
    function(
        $http, 
        leaveCredits,
        leaveDebits
    ){
        return {
            tabs : {
                credits : {
                    title: 
                        'Credits',
                    gridOptions: 
                        leaveCredits
                        .gridOptions
                },
                debits : {
                    title: 
                        'Debits',
                    gridOptions: 
                        leaveDebits
                        .gridOptions
                }
            },
            initializeTabs : function( tabs, row ){
                var academicStaffID; 
                
                academicStaffID= (
                    row
                    .entity
                    .academicStaffID
                );
                
                getCredits( 
                    tabs
                    .credits,
                    academicStaffID
                );
                
                getDebits( 
                    tabs
                    .debits,
                    academicStaffID
                );
                
            }
        };
        
        function getCredits( creditsTab, academicStaffID ){
            $http
            .get(
                '/regularStaff/getInfo?type=leaveCredits&id=' + academicStaffID
            )
            .then( 
                function( res ) {
                    console
                    .log(
                        res
                        .data
                    );
                    
                    creditsTab
                    .gridOptions
                    .data = (
                        res
                        .data
                    );
                }
            );
            
        } 
        
        function getDebits( debitsTab , academicStaffID ){
            $http
            .get(
                '/regularStaff/getInfo?type=leaveDebits&id=' + academicStaffID
            )
            .then( 
                function( res ) {
                    debitsTab
                    .gridOptions
                    .data = (
                        res
                        .data
                    );
                }
            );
            
        }
    }
);