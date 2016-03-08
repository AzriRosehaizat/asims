application.service('csRTR', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/rightToRefusal/' + formData.model.rightToRefusalID, formData.model)
                .then(function(res) {
                    return $http.get('/contractStaff/getInfo?type=rightToRefuse&id=' + formData.model.contractStaffID +
                        '&where=' + res.data.rightToRefusalID);
                });
        },
        create: function(formData) {
            formData.model.contractStaffID = mainRow.entity.contractStaffID;
            return $http.post('/rightToRefusal', formData.model)
                .then(function(res) {
                    return $http.get('/contractStaff/getInfo?type=rightToRefuse&id=' + formData.model.contractStaffID +
                        '&where=' + res.data.rightToRefusalID);
                });
        },
        delete: function(formData) {
            return $http.delete('/rightToRefusal/' + formData.model.rightToRefusalID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Right To Refuse';
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
                assign: [{
                    from: "departmentCode.obj.departmentID",
                    to: "departmentID"
                }],
                reset: ["departmentID", "courseNo"],
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
                        value: "departmentID"
                    }]
                },
                link: "application.course",
                output: {
                    obj: {},
                    name: "courseNo",
                    meta: [{
                        tag: "",
                        name: "title"
                    }]
                },
                assign: [{
                    from: "courseNo.obj.title",
                    to: "title"
                }],
                reset: ["sectionNo", "title"],
                disabled: "isEmpty(['departmentID'])",
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Title",
                required: true,
                readonly: true
            }, {
                type: "autocomplete",
                name: "sectionNo",
                label: "Section No.",
                url: {
                    start: "/section?where={",
                    end: "\"sectionNo\":{\"startsWith\":\""
                },
                link: "application.section",
                output: {
                    obj: {},
                    name: "sectionNo",
                    meta: [{
                        tag: "Type: ",
                        name: "sectionType"
                    }]
                },
                required: true
            }, {
                type: "text",
                name: "startTerm",
                label: "Start Term",
                required: true
            }, {
                type: "text",
                name: "endTerm",
                label: "End Term",
                required: true
            }];

            formService.init(formData, gridData, null, 'csRTR', false);
        },
        initEditForm: function(formData, gridData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Right To Refuse';
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
                assign: [{
                    from: "departmentCode.obj.departmentID",
                    to: "departmentID"
                }],
                reset: ["departmentID", "courseNo"],
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
                        value: "departmentID"
                    }]
                },
                link: "application.course",
                output: {
                    obj: {},
                    name: "courseNo",
                    meta: [{
                        tag: "",
                        name: "title"
                    }]
                },
                assign: [{
                    from: "courseNo.obj.title",
                    to: "title"
                }],
                reset: ["sectionNo", "title"],
                disabled: "isEmpty(['departmentID'])",
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Title",
                required: true,
                readonly: true
            }, {
                type: "autocomplete",
                name: "sectionNo",
                label: "Section No.",
                url: {
                    start: "/section?where={",
                    end: "\"sectionNo\":{\"startsWith\":\""
                },
                link: "application.section",
                output: {
                    obj: {},
                    name: "sectionNo",
                    meta: [{
                        tag: "Type: ",
                        name: "sectionType"
                    }]
                },
                required: true
            }, {
                type: "text",
                name: "startTerm",
                label: "Start Term",
                required: true
            }, {
                type: "text",
                name: "endTerm",
                label: "End Term",
                required: true
            }];

            formService.init(formData, gridData, row, 'csRTR', false);
        }
    };
});