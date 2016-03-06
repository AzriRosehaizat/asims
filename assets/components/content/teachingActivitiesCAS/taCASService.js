application.service('taCASService', function($http, _, formService) {

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
                    field: 'Rank'
                }],
                readOnly: true
            };
        },
        update: function(formData) {
            // return $http.post('/regularStaff/updateRAS', formData.model);
        },
        create: function(formData) {
            // return $http.post('/regularStaff/createRAS', formData.model);
        },
        delete: function(formData) {
            // return $http.post('/regularStaff/deleteRAS', formData.model);
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Contract Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                readonly: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                readonly: true
            }, {
                type: "text",
                name: "employeeNo",
                label: "Employee No.",
                readonly: true
            }];

            gridData.readOnly = this.gridOptions().readOnly;
            formService.init(formData, gridData, null, 'taCASService', true);
        },
        initEditForm: function(formData, gridData, row) {
            
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Contract Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                readonly: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                readonly: true
            }, {
                type: "text",
                name: "employeeNo",
                label: "Employee No.",
                readonly: true
            }];

            gridData.readOnly = this.gridOptions().readOnly;
            formService.init(formData, gridData, row, 'taCASService', true);
        },
        getRow: function(row) {
            return $http.get('/contractStaff/getAllContractStaff/' + row.entity.contractStaffID);
        }
    };
});