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
            tabs : function( $scope ){
                return {
                    credits : {
                        title: 
                            'Credits',
                        gridOptions: 
                            leaveCredits
                            .gridOptions( $scope )
                    },
                    debits : {
                        title: 
                            'Debits',
                        gridOptions: 
                            leaveDebits
                            .gridOptions( $scope )
                    }  
                };
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