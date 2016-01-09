application.controller('professorController', function( $scope ) {
    
    $scope.gridOptions = {
        enableRowSelection: true,
        enableSorting: true,
        columnDefs: [
            { name: 'First Name', field: 'firstName' },
            { name: 'Last Name', field: 'lastName' },
            { name: 'Hire Date', field: 'hireDate' },
        ],
        data:[
            {firstName:'James', lastName:'MacKay', hireDate:'02/28/1991'},
            {firstName:'Azri', lastName:'Don\'tRemember', hireDate:'Don\'t Know'}
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
        {   title:'Related Table 2', 
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