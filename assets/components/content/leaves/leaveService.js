/* global
    application
*/

application
    .service(
        'leaveService',
        function(
            $http,
            _,
            formService,
            $q
        ) {
            return {
                gridOptions: {
                    columnDefs: [{
                        name: 'First Name',
                        field: 'firstName'
                    }, {
                        name: 'Last Name',
                        field: 'lastName'
                    }, {
                        name: 'Department',
                        field: 'departmentCode'
                    }, {
                        name: 'Rank',
                        field: 'rank'
                    }],
                    readOnly: true
                },
                setForm: function(formData, gridData, row) {
                    gridData
                        .readOnly = (
                            true
                        );

                    formData
                        .model = (
                            _
                            .cloneDeep(
                                row
                                .entity
                            )
                        );

                    formData
                        .isEditing = (
                            true
                        );

                    formData
                        .title = (
                            'Regular Staff Details'
                        );

                    formData
                        .inputs = [{
                            type: "text",
                            name: "firstName",
                            label: "First name"
                        }, {
                            type: "text",
                            name: "lastName",
                            label: "Last name"
                        }, {
                            type: "number",
                            name: "researchBalance",
                            label: "Research Balance"
                        }, {
                            type: "number",
                            name: "administrativeBalance",
                            label: "Administrative Balance"
                        }];

                    formService
                        .init(
                            formData,
                            gridData,
                            row,
                            'leaveService',
                            true
                        );
                },
                getRow: function(row) {
                    return $q
                        .resolve({
                            data: [
                                row
                                .entity
                            ]
                        });
                }
            };
        }
    );