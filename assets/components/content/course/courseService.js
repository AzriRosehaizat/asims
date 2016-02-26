application.service('courseService', function($http, $q, _, formService) {

    return {
        gridOptions: function() {
            return {
                noUnselect: true,
                multiSelect: false,
                enableRowHeaderSelection: false,
                enableHorizontalScrollbar: 0,
                columnDefs: [{
                    name: 'Course No',
                    field: 'courseNo'
                }, {
                    name: 'Name',
                    field: 'title'
                }, {
                    name: 'Description',
                    field: 'description'
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
            formData.title = 'Add Course';
            formData.inputs = [{
                type: "text",
                name: "courseNo",
                label: "Course No",
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
            }];

            formService.init(formData, gridData, null, 'courseService', true);
        },
        initEditForm: function(formData, gridData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Course';
            formData.inputs = [{
                type: "text",
                name: "courseNo",
                label: "Course No",
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
            }];

            formService.init(formData, gridData, row, 'courseService', true);
        },
        getRow: function(row) {
            console.log("courseService: getRow");
            return $q.when(true);
        }
    };
});