application.service('csTA', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            return $http.put('/teachingActivities/' + formData.model.teachingActivitiesID, formData.model)
                .then(function(res) {
                    return $http.get('/contractStaff/getInfo?type=teaching&id=' + res.data.academicStaffID.academicStaffID +
                        '&where=' + res.data.teachingActivitiesID);
                });
        },
        create: function(formData) {
            formData.model.academicStaffID = mainRow.entity.academicStaffID;
            return $http.post('/teachingActivities', formData.model)
                .then(function(res) {
                    return $http.get('/contractStaff/getInfo?type=teaching&id=' + res.data.academicStaffID +
                        '&where=' + res.data.teachingActivitiesID);
                });
        },
        delete: function(formData) {
            return $http.delete('/TeachingActivities/' + formData.model.teachingActivitiesID);
        },
        initAddForm: function(formData, gridData, mRow) {
            mainRow = mRow;

            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Teaching Activity';
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
                type: "number",
                name: "FCEValue",
                label: "FCE Value",
                required: true
            }, {
                type: "text",
                name: "role",
                label: "Role"
            }];

            formService.init(formData, gridData, null, 'csTA', false);
        },
        initEditForm: function(formData, gridData, row) {
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Edit Teaching Activity';
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
                type: "number",
                name: "FCEValue",
                label: "FCE Value",
                required: true
            }, {
                type: "text",
                name: "role",
                label: "Role"
            }];

            formService.init(formData, gridData, row, 'csTA', false);
        },
    };
});