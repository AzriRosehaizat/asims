/* global
    application
*/

application
.service(
    'leaveCredits', 
    function(
        $http, 
        _, 
        uiGridConstants,
        formService,
        gridService
    ){
        return {
            gridOptions : function ( $scope ){
                return {
                    showColumnFooter: true,
                    columnDefs: [
                        {
                            name: 
                                'Credit',
                            field: 
                                'amount',
                            aggregationType: 
                                uiGridConstants
                                .aggregationTypes
                                .sum
                        }, {
                            name: 
                                'Start Date',
                            field: 
                                'startDate',
                            cellFilter: 
                                'date:\'MM-dd-yyyy\''
                        }, {
                            name: 
                                'End Date',
                            field: 
                                'endDate',
                            cellFilter: 
                                'date:\'MM-dd-yyyy\''
                        }, {
                            name: 
                                'Type',
                            field: 
                                'leaveCreditType'
                        }
                    ],
                    onRegisterApi : function( gridApi ){
                        gridService.set(
                            gridApi, 
                            'leaveCredit'
                        );
                        
                        (function( gridOptions ){
                            gridApi
                            .selection
                            .on
                            .rowSelectionChanged( 
                                null, 
                                function( row ){
                                    initializeEdit(
                                        $scope
                                        .formData,
                                        gridOptions
                                        .data,
                                        row
                                    );
                                }
                            );
                        })(this);
                    }
                };
            },
            initAddForm: initializeAdd,
            initEditForm: initializeEdit,
            create: create,
            update: update,
            delete: remove
        };
        
        function initializeEdit( formData, gridData, row ){

            formData
            .model = (
                Object.
                assign(
                    _
                    .cloneDeep(
                        row
                        .entity
                    ),
                    {
                        startDate : 
                            formService
                            .formatDate(
                                row
                                .entity
                                .startDate
                            ),
                        endDate : 
                            formService
                            .formatDate(
                                row
                                .entity
                                .endDate
                            )
                    }   
                )
            );
            
            formData
            .isEditing = (
                true
            );
            
            formData
            .title = (
                'Leave Credit'
            );
            
            formData
            .inputs = getInputs();

            formService
            .init(
                formData, 
                gridData, 
                row, 
                'leaveCredits',
                false
            );
        }
        
        function initializeAdd( formData, gridData, parentRow ){
            
            formData
            .model = {
                regularStaffID : 
                    parentRow
                    .entity
                    .regularStaffID
            };
            
            formData
            .isEditing = (
                false
            );
            
            formData
            .title = (
                'Leave Credit'
            );
            
            
            formData
            .inputs = getInputs();

            formService
            .init(
                formData, 
                gridData, 
                null, 
                'leaveCredits',
                false
            );
        }
        
        function create( formData ){
            return $http
            .post(
                '/LeaveCredit/', 
                formData
                .model
            );
        }
        
        function update( formData ){
            return $http
            .put(
                '/LeaveCredit/' + 
                formData
                .model
                .leaveCreditID, 
                formData
                .model
            );
        }
        
        function remove( formData ){
            return $http
            .delete(
                '/LeaveCredit/' + 
                formData
                .model
                .leaveCreditID
            );   
        }
        
        function getInputs(){
            return [
                {
                    type: 
                        "number",
                    name: 
                        "amount",
                    label: 
                        "Credit",
                    required: 
                        true
                }, {
                    type: 
                        "date",
                    name: 
                        "startDate",
                    label: 
                        "Start Date",
                    required: 
                        true
                }, {
                    type: 
                        "date",
                    name: 
                        "endDate",
                    label: 
                        "End Date",
                    required: 
                        true,
                    minDate: 
                        "startDate"
                }, {
                    type: 
                        "select",
                    name: 
                        "leaveCreditType",
                    label: 
                        "Type",
                    items: 
                        [
                            "Research",
                            "Administrative"
                        ],
                    path: 
                        "leaveCreditType",
                    text:
                        "Select a Credit Type",
                    required: 
                        true
                }, {
                    type: 
                        "textarea",
                    name: 
                        "description",
                    label: 
                        "Eligibility"
                }
            ];
        }
    }
);