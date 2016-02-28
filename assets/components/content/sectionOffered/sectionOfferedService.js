application.service('sectionOfferedService', function($http, _, formService) {

    return {
        gridOptions: function() {
            return {
                columnDefs: [{
                    name: 'Department',
                    field: 'departmentCode'
                }, {
                    name: 'Course No.',
                    field: 'courseNo'
                }, {
                    name: 'Section',
                    field: 'sectionNo'
                }, {
                    name: 'Start Date',
                    field: 'startDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }, {
                    name: 'End Date',
                    field: 'endDate',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                }, {
                    name: 'Title',
                    field: 'title'
                }]
            };
        },
        update: function(formData) {
            return $http.post('', formData.model);
        },
        create: function(formData) {
            return $http.post('', formData.model);
        },
        delete: function(formData) {
            return $http.post('', formData.model);
        },
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Section Offered';
            formData.inputs = [{
                type: "autocomplete",
                name: "departmentCode",
                label: "Dept. Code",
                url: {
                    start: "/department?where={",
                    end: "\"departmentCode\":{\"startsWith\":\""
                },
                link: "application.department",
                output: {
                    obj: {},
                    name: "departmentCode"
                },
                disabled: false,
                required: true
            }, {
                type: "autocomplete",
                name: "courseNo",
                label: "Course No.",
                url: {
                    start: "/course?where={",
                    end: "\"courseNo\":{\"startsWith\":\"",
                    where: [{
                        key: "departmentID",
                        value: "departmentCode.obj.departmentID"
                    }]
                },
                link: "application.course",
                output: {
                    obj: {},
                    name: "courseNo"
                },
                disabled: "!isObject('departmentCode')",
                required: true
            }, {
                type: "autocomplete",
                name: "sectionNo",
                label: "Section No.",
                url: {
                    start: "/section_offered/search?where={",
                    end: "\"sectionNo\":{\"startsWith\":\""
                },
                link: "application.course",
                output: {
                    obj: {},
                    name: "sectionNo"
                },
                disabled: "!isObject('courseNo')",
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start Date",
                required: true,
                disabled: false
            }, {
                type: "text",
                name: "title",
                label: "Title",
                disabled: true,
                required: true
            }];

            formService.init(formData, gridData, null, 'sectionOfferedService', true);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);

            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Section Offered';
            formData.inputs = [{

            }];

            formService.init(formData, gridData, row, 'sectionOfferedService', true);
        },
        getRow: function(row) {
            return $http.get('');
        }
    };
});