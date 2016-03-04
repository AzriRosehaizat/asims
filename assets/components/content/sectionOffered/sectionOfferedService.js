application.service('sectionOfferedService', function($http, _, formService) {

    return {
        //Define Grid Options here
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
                    name: 'Title',
                    field: 'title'
                }, {
                    name: 'Start Date',
                    field: 'startDate',
                    cellFilter: 'date:\'MM-dd-yyyy\''
                }, {
                    name: 'End Date',
                    field: 'endDate',
                    cellFilter: 'date:\'MM-dd-yyyy\''
                }]
            };
        },
        update: function(formData) {
            if (_.isObject(formData.model.departmentCode) &&
                _.isObject(formData.model.courseNo) &&
                _.isObject(formData.model.sectionNo)) {

                //Define the IDs
                formData.model.courseID = formData.model.courseNo.obj.courseID;
                formData.model.sectionID = formData.model.sectionNo.obj.sectionID;
            }
            
            //Update section offered
            return $http.put('/Section_Offered/' + formData.model.sectionOfferedID, formData.model)
                .then(function(res) {
                    return $http.get('/Section_Offered/getSectionOffered/' + res.data.sectionOfferedID);
                });
        },
        create: function(formData) {
            if (_.isObject(formData.model.departmentCode) &&
                _.isObject(formData.model.courseNo) &&
                _.isObject(formData.model.sectionNo)) {

                //Define the IDs
                formData.model.courseID = formData.model.courseNo.obj.courseID;
                formData.model.sectionID = formData.model.sectionNo.obj.sectionID;
            }
            // For the sake of simplicity pass everything
            // Should really pass only whats needed
            return $http.post('/Section_Offered', formData.model)
                .then(function(res) {
                    return $http.get('/Section_Offered/getSectionOffered/' + res.data.sectionOfferedID);
                });
        },
        delete: function(formData) {
            return $http.delete('/Section_Offered/' + formData.model.sectionOfferedID);
        },
        // On add new section to offer
        initAddForm: function(formData, gridData) {
            formData.model = {};
            formData.isEditing = false;
            formData.title = 'Add Section Offered';
            //Here you define your form types, to generate the html form
            //templates are stored in /form/tmpl/*
            formData.inputs = [{
                //This is an example for md-autocomplete/dropdown
                type: "autocomplete",
                //object name
                name: "departmentCode",
                //Caption
                label: "Dept. Code",
                //URL to parse the dropdown items
                url: {
                    start: "/department?where={",
                    end: "\"departmentCode\":{\"startsWith\":\""
                },
                //for UI-sref linking 
                link: "application.department",
                output: {
                    obj: {},
                    name: "departmentCode"
                },
                change: {
                    reset: "courseNo"
                },
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
                type: "autocomplete",
                name: "sectionNo",
                label: "Section No.",
                url: {
                    start: "/Section?where={",
                    end: "\"sectionNo\":{\"startsWith\":\""
                },
                link: "application.section",
                output: {
                    obj: {},
                    name: "sectionNo"
                },
                change: {
                    from: "courseNo.obj.title",
                    to: "title"
                },
                disabled: "!isObject('courseNo')",
                required: true
            },  {
                type: "date",
                name: "startDate",
                label: "Start Date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End Date",
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
                //This is an example for md-autocomplete/dropdown
                type: "autocomplete",
                //object name
                name: "departmentCode",
                //Caption
                label: "Dept. Code",
                //URL to parse the dropdown items
                url: {
                    start: "/department?where={",
                    end: "\"departmentCode\":{\"startsWith\":\""
                },
                //for UI-sref linking 
                link: "application.department",
                output: {
                    obj: {},
                    name: "departmentCode"
                },
                change: {
                    reset: "courseNo"
                },
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
                readonly: true
            }, {
                type: "autocomplete",
                name: "sectionNo",
                label: "Section No.",
                url: {
                    start: "/Section?where={",
                    end: "\"sectionNo\":{\"startsWith\":\""
                },
                link: "application.section",
                output: {
                    obj: {},
                    name: "sectionNo"
                },
                change: {
                    from: "courseNo.obj.title",
                    to: "title"
                },
                disabled: "!isObject('courseNo')",
                required: true
            },  {
                type: "date",
                name: "startDate",
                label: "Start Date",
                required: true
            }, {
                type: "date",
                name: "endDate",
                label: "End Date",
                required: true
            }];

            formService.init(formData, gridData, row, 'sectionOfferedService', true);
        },
        getRow: function(row) {
            return $http.get('/Section_Offered/getSectionOffered/' + row.entity.sectionOfferedID);
        }
    };
});