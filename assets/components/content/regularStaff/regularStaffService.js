application.service('regularStaffService', function($http, _, formService) {

    return {
        gridOptions: function() {
            return {
                noUnselect: true,
                multiSelect: false,
                enableRowHeaderSelection: false,
                enableHorizontalScrollbar: 0,
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
                    field: 'Rank'
                }, {
                    name: 'Tenure Date',
                    field: 'tenureDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }, {
                    name: 'Cont\' appointment date',
                    field: 'contAppDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }]
            };
        },
        update: function(formData) {
            return $http.post('/regularStaff/updateRAS', formData.model);
        },
        create: function(formData) {
            return $http.post('/regularStaff/createRAS', formData.model);
        },
        delete: function(formData) {
            return $http.post('/regularStaff/deleteRAS', formData.model);
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                disabled: false,
                required: true
            }, {
                type: "date",
                name: "tenureDate",
                label: "Tenure date",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "contAppDate",
                label: "Cont' appointment date",
                disabled: false,
                required: false
            }];

            formService.setGridData(gridData);
            formService.setFormData(formData, 'regularStaffService');
        },
        initEditForm: function(formData, row) {
            row.entity.tenureDate = formService.formatDate(row.entity.tenureDate);
            row.entity.contAppDate = formService.formatDate(row.entity.contAppDate);
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Staff';
            formData.inputs = [{
                type: "text",
                name: "firstName",
                label: "First name",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "lastName",
                label: "Last name",
                disabled: false,
                required: true
            }, {
                type: "date",
                name: "tenureDate",
                label: "Tenure date",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "contAppDate",
                label: "Cont' appointment date",
                disabled: false,
                required: false
            }];

            formService.setRow(row);
            formService.setFormData(formData, 'regularStaffService');
        }
    };
});