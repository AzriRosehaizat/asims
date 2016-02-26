application.service('departmentService', function($http, $q, _, formService) {

    return {
        gridOptions: function() {
            return {
                noUnselect: true,
                multiSelect: false,
                enableRowHeaderSelection: false,
                enableHorizontalScrollbar: 0,
                columnDefs: [{
                    name: 'Code',
                    field: 'departmentCode'
                }, {
                    name: 'Name',
                    field: 'title'
                }, {
                    name: 'Description',
                    field: 'description'
                }, {
                    name: 'Faculty',
                    field: 'facultyID.title'
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
            formData.title = 'Add Department';
            formData.inputs = [{
                type: "text",
                name: "departmentCode",
                label: "Code",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Name",
                disabled: false,
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description",
                disabled: false,
                required: false
            }, {
                type: "text",
                name: "facultyTitle",
                label: "Faculty",
                disabled: false,
                required: true
            }];

            formService.init(formData, gridData, null, 'departmentService', true);
        },
        initEditForm: function(formData, gridData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Department';
            formData.inputs = [{
                type: "text",
                name: "departmentCode",
                label: "Code",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Name",
                disabled: false,
                required: true
            }, {
                type: "textarea",
                name: "description",
                label: "Description",
                disabled: false,
                required: false
            }, {
                type: "text",
                name: "facultyTitle",
                label: "Faculty",
                disabled: false,
                required: true
            }];

            formService.init(formData, gridData, row, 'departmentService', true);
        },
        getRow: function(row) {
            console.log("departmentService: getRow");
            return $q.when(true);
        }
    };
});