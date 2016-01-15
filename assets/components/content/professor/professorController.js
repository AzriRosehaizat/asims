application.controller('professorController', function( $scope ) {
    
    $scope.gridOptions = {
        enableRowSelection: true,
        enableSorting: true,
        columnDefs: [
            { name: 'First Name', field: 'firstName' },
            { name: 'Last Name', field: 'lastName' },
            { name: 'Hire Date', field: 'hireDate' },
            { name: 'Termination Date', field: 'terminationDate' }
        ],
        data:[

        ]
    };
    
    $scope.tabs = [
        {   title:'Department', 
            gridOptions:{
                enableSorting: true,
                columnDefs: [
                  { name: 'Name', field: 'name' },
                  { name: 'Description', field: 'description' },
                ],
                data:[
                    {name:'ACS', description:'Applied Computer Science'}
                ]
            } 
        },
        {   title:'Teaching Activities', 
            gridOptions:{
                enableSorting: true,
                columnDefs: [
                  { name: 'RT21', field: 'firstName' },
                  { name: 'RT22', field: 'lastName' },
                ],
                data:[]
            }  
        }
    ];
});