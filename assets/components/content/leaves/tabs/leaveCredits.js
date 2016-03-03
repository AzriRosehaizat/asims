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
        formService
    ){
        return {
            gridOptions : function ( $scope ){
                return {
                    showColumnFooter: true,
                    columnDefs: [
                        {
                            name: 
                                'Amount',
                            field: 
                                'amount',
                            aggregationType: 
                                uiGridConstants
                                .aggregationTypes
                                .sum
                        }, {
                            name: 
                                'Date Issued',
                            field: 
                                'dateIssued'
                        }, {
                            name: 
                                'Type',
                            field: 
                                'leaveCreditType'
                        }
                    ],
                    onRegisterApi : function( gridApi ){
                        (function( gridOptions ){
                            gridApi
                            .selection
                            .on
                            .rowSelectionChanged( 
                                $scope, 
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
                        dateIssued : 
                            formService
                            .formatDate(
                                row
                                .entity
                                .dateIssued
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
                'Edit Leave Credit'
            );
            
            formData
            .inputs = [
                {
                    type: 
                        "number",
                    name: 
                        "amount",
                    label: 
                        "Amount",
                    disabled: 
                        false,
                    required: 
                        true
                }, {
                    type: 
                        "date",
                    name: 
                        "dateIssued",
                    label: 
                        "Date Issued",
                    disabled: 
                        false,
                    required: 
                        true
                }, {
                    type: 
                        "text",
                    name: 
                        "leaveCreditType",
                    label: 
                        "Type",
                    disabled: 
                        false,
                    required: 
                        true
                }, {
                    type: 
                        "textarea",
                    name: 
                        "description",
                    label: 
                        "Description",
                    disabled: 
                        false,
                    required: 
                        false
                }
            ];

            formService.init(
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
                'Add Leave Credit'
            );
            
            formData.inputs = [
                {
                    type: 
                        "number",
                    name: 
                        "amount",
                    label: 
                        "Amount",
                    disabled: 
                        false,
                    required: 
                        true
                }, {
                    type: 
                        "date",
                    name: 
                        "dateIssued",
                    label: 
                        "Date Issued",
                    disabled: 
                        false,
                    required: 
                        true
                }, {
                    type: 
                        "text",
                    name: 
                        "leaveCreditType",
                    label: 
                        "Type",
                    disabled: 
                        false,
                    required: 
                        true
                }, {
                    type: 
                        "textarea",
                    name: 
                        "description",
                    label: 
                        "Description",
                    disabled: 
                        false,
                    required: 
                        false
                }
            ];

            formService.init(
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
        
    }
);