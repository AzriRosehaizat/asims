application.service('csTA', function($http, _, formService) {

    var mainRow;

    return {
        update: function(formData) {
            if (_.isObject(formData.model.sectionNo)) {
                formData.model.sectionOfferedID = formData.model.sectionNo.obj.sectionOfferedID;
            }
            return $http.put('/teachingActivities/' + formData.model.teachingActivitiesID, formData.model)
                .then(function(res) {
                    return $http.get('/contractStaff/getInfo?type=teaching&id=' + res.data.academicStaffID.academicStaffID +
                        '&where=' + res.data.teachingActivitiesID);
                });
        },
        create: function(formData) {
            if (_.isObject(formData.model.sectionNo)) {
                formData.model.academicStaffID = mainRow.entity.academicStaffID;
                formData.model.sectionOfferedID = formData.model.sectionNo.obj.sectionOfferedID;
            }
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
                change: {
                    reset: "courseNo"
                },
                disabled: false,
                required: true
            }, {
                type: "acCustom",
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
                    name: "courseNo",
                    meta: [{
                        tag: "",
                        name: "title"
                    }]
                },
                change: {
                    reset: "sectionNo"
                },
                disabled: "!isObject('departmentCode')",
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Title",
                disabled: true,
                required: true
            }, {
                type: "acCustom",
                name: "sectionNo",
                label: "Section No.",
                url: {
                    start: "/section_offered/search?where={",
                    end: "\"sectionNo\":{\"startsWith\":\"",
                    where: [{
                        key: "courseID",
                        value: "courseNo.obj.courseID"
                    }]
                },
                link: "application.sectionOffered",
                output: {
                    obj: {},
                    name: "sectionNo",
                    meta: [{
                        tag: "",
                        name: "startDate"
                    }, {
                        tag: "- ",
                        name: "endDate"
                    }]
                },
                change: {
                    from: "courseNo.obj.title",
                    to: "title"
                },
                disabled: "!isObject('courseNo')",
                required: true
            }, {
                type: "number",
                name: "FCEValue",
                label: "FCE Value",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "role",
                label: "Role",
                disabled: false,
                required: false
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
                change: {
                    reset: "courseNo"
                },
                disabled: false,
                required: true
            }, {
                type: "acCustom",
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
                    name: "courseNo",
                    meta: {
                        tag: "",
                        name: "title"
                    }
                },
                change: {
                    reset: "sectionNo"
                },
                disabled: "!isObject('departmentCode')",
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Title",
                disabled: true,
                required: true
            }, {
                type: "acCustom",
                name: "sectionNo",
                label: "Section No.",
                url: {
                    start: "/section_offered/search?where={",
                    end: "\"sectionNo\":{\"startsWith\":\"",
                    where: [{
                        key: "courseID",
                        value: "courseNo.obj.courseID"
                    }]
                },
                link: "application.sectionOffered",
                output: {
                    obj: {},
                    name: "sectionNo",
                    meta: [{
                        tag: "",
                        name: "startDate"
                    }, {
                        tag: "- ",
                        name: "endDate"
                    }]
                },
                change: {
                    from: "courseNo.obj.title",
                    to: "title"
                },
                disabled: "!isObject('courseNo')",
                required: true
            }, {
                type: "number",
                name: "FCEValue",
                label: "FCE Value",
                disabled: false,
                required: true
            }, {
                type: "text",
                name: "role",
                label: "Role",
                disabled: false,
                required: false
            }];

            formService.init(formData, gridData, row, 'csTA', false);
        },
    };
});