application.service('taRASService', ['$http', '_', 'formService', function($http, _, formService) {

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
                }, {
                    name: 'Tenure Date',
                    field: 'tenureDate',
                    cellFilter: 'date:\'MM-dd-yyyy\''
                }, {
                    name: 'Continuing Appt. Date',
                    field: 'contAppDate',
                    cellFilter: 'date:\'MM-dd-yyyy\''
                }],
                readOnly: true
            };
        },
        update: function(formData) {
            // read-only
        },
        create: function(formData) {
            // read-only
        },
        delete: function(formData) {
            // read-only
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Regular Staff';
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
            }, {
                type: "date",
                name: "tenureDate",
                label: "Tenure Date"
            }, {
                type: "date",
                name: "contAppDate",
                label: "Continuing Appt. Date"
            }];

            gridData.readOnly = this.gridOptions().readOnly;
            formService.init(formData, gridData, null, 'taRASService', true);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.tenureDate = formService.formatDate(row.entity.tenureDate);
            row.entity.contAppDate = formService.formatDate(row.entity.contAppDate);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Regular Staff';
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
            }, {
                type: "date",
                name: "tenureDate",
                label: "Tenure Date"
            }, {
                type: "date",
                name: "contAppDate",
                label: "Continuing Appt. Date"
            }];

            gridData.readOnly = this.gridOptions().readOnly;
            formService.init(formData, gridData, row, 'taRASService', true);
        },
        getRow: function(row) {
            return $http.get('/regularStaff/getAllRegularStaff/' + row.entity.regularStaffID);
        }
    };
}]);