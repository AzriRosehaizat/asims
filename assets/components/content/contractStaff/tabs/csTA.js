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
                assign: [{
                    from: "sectionNo.obj.sectionID",
                    to: "sectionID"
                }],
                required: true
            },  {
                type: "select",
                name: "term",
                label: "Term",
                // items: formService.getTerms(),
                // path: "term",
                // text: "Select a term",
                required: true
            }, {
                type: "select",
                name: "year",
                label: "Year",
                // items: formService.getYears(),
                // path: "year",
                // text: "Select a year",
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date"
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                //minDate: "startDate"
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
<<<<<<< HEAD
                reset: ["courseNo"],
=======
                reset: ["departmentID", "courseNo"],
>>>>>>> 36968aab0c48c95f83308fca0dae597aebd2d90a
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
<<<<<<< HEAD
                    from: "courseNo.obj.courseID",
                    to: "courseID"
                }, {
                    from: "courseNo.obj.title",
                    to: "title"
                }],
                reset: ["title"],
=======
                    from: "courseNo.obj.title",
                    to: "title"
                }],
                reset: ["sectionNo", "title"],
>>>>>>> 36968aab0c48c95f83308fca0dae597aebd2d90a
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
<<<<<<< HEAD
                assign: [{
                    from: "sectionNo.obj.sectionID",
                    to: "sectionID"
                }],
                required: true
            }, {
                type: "select",
                name: "term",
                label: "Term",
                // items: formService.getTerms(),
                // path: "term",
                // text: "Select a term",
=======
>>>>>>> 36968aab0c48c95f83308fca0dae597aebd2d90a
                required: true
            }, {
                type: "select",
                name: "year",
                label: "Year",
                // items: formService.getYears(),
                // path: "year",
                // text: "Select a year",
                required: true
            }, {
                type: "date",
                name: "startDate",
                label: "Start date"
            }, {
                type: "date",
                name: "endDate",
                label: "End date",
                //minDate: "startDate"
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