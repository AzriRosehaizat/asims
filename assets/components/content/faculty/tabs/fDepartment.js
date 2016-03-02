application.service('fDepartment', function($http, $q, _, formService) {

    //var mainRow;

    return {
        update: function(formData) {
            //read only
        },
            
        create: function(formData) {
            //read only
        },
        delete: function(formData) {
            //read only
            return $q.when(true);
        },
        initAddForm: function(formData, gridData, mRow) {
            //mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Department';
            formData.inputs = [{
                type: "text",
                name: "departmentCode",
                label: "Department Code",
                disabled: true,
                required: true
            },{
                type: "text",
                name: "title",
                label: "Title",
                disabled: true,
                required: true
            },{
                type: "text",
                name: "description",
                label: "Description",
                disabled: true,
                required: true
            }];

            formService.init(formData, gridData, null, 'fDepartment', false);
        },
        initEditForm: function(formData, gridData, row) {
            
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Department';
            formData.inputs = [{
                type: "text",
                name: "departmentCode",
                label: "Department Code",
                disabled: true,
                required: true
            },{
                type: "text",
                name: "title",
                label: "Title",
                disabled: true,
                required: true
            },{
                type: "text",
                name: "description",
                label: "Description",
                disabled: true,
                required: true
            }];

            formService.init(formData, gridData, row, 'fDepartment', false);
        },
    };
});