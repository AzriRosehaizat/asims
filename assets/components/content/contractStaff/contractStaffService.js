application.service('contractStaffService', function($http, $q, _, formService) {

    return {
        gridOptions: function() {
            return {
                noUnselect: true,
                multiSelect: false,
                enableRowHeaderSelection: false,
                enableHorizontalScrollbar: 0,
                columnDefs: [{
                    name: 'First Name',
                    field: 'academicStaffID.firstName'
                }, {
                    name: 'Last Name',
                    field: 'academicStaffID.lastName'
                }, {
                    name: 'Start Date',
                    field: 'ContractStaffEmployment[0].startDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }, {
                    name: 'End Date',
                    field: 'ContractStaffEmployment[0].endDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }]
            };
        },
        update: function(formData) {
            console.log("update");
            return $q.when(true);
        },
        create: function(formData) {
            console.log("create");
            return $q.when(true);
        },
        delete: function(formData) {
            console.log("delete");
            return $q.when(true);
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
                name: "startDate",
                label: "Start date",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, null, 'contractStaffService', true);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);
            
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
                name: "startDate",
                label: "Start date",
                disabled: false,
                required: false
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, row, 'contractStaffService', true);
        },
        getRow: function(row) {
            return $q.when(true);
        }
    };
});