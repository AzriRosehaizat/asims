application.service('taCASTA', function($http, _, formService) {

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
            formData.title = 'Teaching Activity';
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
                reset: ["courseNo"],
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
                    from: "courseNo.obj.courseID",
                    to: "courseID"
                }, {
                    from: "courseNo.obj.title",
                    to: "title"
                }],
                reset: ["title"],
                disabled: "isEmpty(['departmentID'])",
                required: true
            }, {
                 type: "text",
                name: "title",
                label: "Title",
                required: true
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
                assign: [{
                    from: "sectionNo.obj.sectionID",
                    to: "sectionID"
                }],
                required: true
            },  {
                type: "select",
                name: "term",
                label: "Term",
                items: formService.getTerms(),
                path: "term",
                text: "Select a term",
                required: true
            }, {
                type: "select",
                name: "year",
                label: "Year",
                items: formService.getYears(),
                path: "year",
                text: "Select a year",
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date"
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                minDate: "startDate"
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

            formService.init(formData, gridData, null, 'taCASTA', false);
        },
        initEditForm: function(formData, gridData, row) {
            row.entity.startDate = formService.formatDate(row.entity.startDate);
            row.entity.endDate = formService.formatDate(row.entity.endDate);
            
            formData.model = _.cloneDeep(row.entity);
            formData.isEditing = true;
            formData.title = 'Teaching Activity';
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
                reset: ["courseNo"],
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
                    from: "courseNo.obj.courseID",
                    to: "courseID"
                }, {
                    from: "courseNo.obj.title",
                    to: "title"
                }],
                reset: ["title"],
                disabled: "isEmpty(['departmentID'])",
                required: true
            }, {
                type: "text",
                name: "title",
                label: "Title",
                required: true
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
                assign: [{
                    from: "sectionNo.obj.sectionID",
                    to: "sectionID"
                }],
                required: true
            }, {
                type: "select",
                name: "term",
                label: "Term",
                items: formService.getTerms(),
                path: "term",
                text: "Select a term",
                required: true
            }, {
                type: "select",
                name: "year",
                label: "Year",
                items: formService.getYears(),
                path: "year",
                text: "Select a year",
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date"
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                minDate: "startDate"
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

            formService.init(formData, gridData, row, 'taCASTA', false);
        },
    };
});