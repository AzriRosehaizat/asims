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
                    field: 'rank'
                }]
            };
        },
        update: function(formData) {
            // read only
        },
        create: function(formData) {
            // read only
        },
        delete: function(formData) {
            // read only
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Contract Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First Name"
            }, {
                type: "text",
                name: "lastName",
                label: "Last Name"
            }, {
                type: "text",
                name: "employeeNo",
                label: "Employee No."
            }, {
                type: "text",
                name: "departmentCode",
                label: "Department"
            }, {
                type: "text",
                name: "rank",
                label: "Rank"
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
                label: "First Name"
            }, {
                type: "text",
                name: "lastName",
                label: "Last Name"
            }, {
                type: "text",
                name: "employeeNo",
                label: "Employee No."
            }, {
                type: "text",
                name: "departmentCode",
                label: "Department"
            }, {
                type: "text",
                name: "rank",
                label: "Rank"
            }];

            gridData.readOnly = this.gridOptions().readOnly;
            formService.init(formData, gridData, row, 'taCASService', true);
        },
        getRow: function(row) {
            return $http.get('/contractStaff/getAllContractStaff/' + row.entity.contractStaffID);
        }
    };
});