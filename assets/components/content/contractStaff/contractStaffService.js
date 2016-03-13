application.service('contractStaffService', function($http, $q, _, formService) {

    return {
        gridOptions: function() {
            return {
                columnDefs: [{
                    name: 'First Name',
                    field: 'firstName'
                }, {
                    name: 'Last Name',
                    field: 'lastName'
                }, {
                    name: 'Employee No.',
                    field: 'employeeNo'
                }, {
                    name: 'Department',
                    field: 'departmentCode'
                }, {
                    name: 'Rank',
                    field: 'rank'
                }]
            };
        },
        update: function(formData) {
            return $http.put('/academicStaff/' + formData.model.academicStaffID, formData.model);
        },
        create: function(formData) {
            return $http.post('/academicStaff', formData.model)
                .then(function(aStaff) {
                    return $http.post('/contractStaff', aStaff.data)
                        .then(function(cStaff) {
                            return $http.get('/contractStaff/getAllContractStaff/' + cStaff.data.contractStaffID);
                        });
                });
        },
        delete: function(formData) {
            return $http.delete('/contractStaff/' + formData.model.contractStaffID)
                .then(function(res) {
                    return $http.delete('/academicStaff/' + formData.model.academicStaffID);    
                });
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Contract Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First Name",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last Name",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "employeeNo",
                label: "Employee No.",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, null, 'contractStaffService', true);
        },
        initEditForm: function(formData, gridData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Contract Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First Name",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last Name",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "employeeNo",
                label: "Employee No.",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, row, 'contractStaffService', true);
        },
        getRow: function(row) {
            return $http.get('/contractStaff/getAllContractStaff/' + row.entity.contractStaffID);
        }
    };
});