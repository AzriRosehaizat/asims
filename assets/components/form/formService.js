application.service('formService', function($injector, $mdDialog, _, moment, toaster, CurrentUser) {

    var self = this;
    self.form;
    self.formData = {};
    self.readOnly = false;

    var grid, row, service;
    var mainRow, mainService, isMain;
    var years = [];

    self.init = function(formData, gridData, rowData, serviceName, main) {
        handleRoleControl(formData, gridData);

        self.formData = formData;
        grid = gridData;
        row = rowData;
        service = $injector.get(serviceName);
        isMain = main;

        if (isMain) {
            mainRow = rowData;
            mainService = service;
        }
    };

    self.reset = function() {
        self.formData = {};
    };

    self.submit = function(formData) {
        if (formData.isEditing) {
            self.update(row, formData);
        }
        else {
            self.create(grid, formData);
        }
    };

    self.update = function(row, formData) {
        formData.mode = 'indeterminate';

        service.update(formData)
            .then(function(res) {
                if (_.isArray(res.data)) res.data = res.data[0];
                resetValidation(self.form);
                _.merge(row.entity, res.data);
                updateMainRow();

                toaster.done("Updated successfully!");
            }, function(err) {
                toaster.error(err);
            })
            .finally(function(notice) {
                formData.mode = '';
            });
    };

    self.create = function(grid, formData) {
        formData.mode = 'indeterminate';

        service.create(formData)
            .then(function(res) {
                if (_.isArray(res.data)) res.data = res.data[0];
                resetValidation(self.form);
                grid.unshift(res.data);
                formData.model = {};
                updateMainRow();

                toaster.done("Added successfully!");
            }, function(err) {
                toaster.error(err);
            })
            .finally(function(notice) {
                formData.mode = '';
            });
    };

    self.cancel = function(formData) {
        formData.model = (formData.isEditing) ? _.merge(formData.model, row.entity) : {};
        if (service.cancel) service.cancel(formData);
        resetValidation(self.form);
    };

    self.delete = function(ev, formData) {
        var confirm = $mdDialog.confirm()
            .title('You are deleting a row')
            .textContent('Are you sure?')
            .clickOutsideToClose(true)
            .targetEvent(ev)
            .ok('Delete')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            formData.mode = 'indeterminate';
            var index = grid.indexOf(row.entity);

            service.delete(formData)
                .then(function(res) {
                    resetValidation(self.form);
                    grid.splice(index, 1);
                    updateMainRow();

                    var mRow = (isMain) ? null : mainRow;
                    service.initAddForm(formData, grid, mRow);
                    toaster.done("Deleted successfully!");
                }, function(err) {
                    toaster.error(err);
                })
                .finally(function(notice) {
                    formData.mode = '';
                });
        });
    };

    self.formatDate = function(datef) {
        return (datef) ? (new moment(datef).toDate()) : null;
    };

    self.getYears = function() {
        if (_.isEmpty(years)) {
            var min = 2000,
                max = new Date().getFullYear() + 1;

            for (var i = max; i >= min; i--) {
                years.push(i);
            }
        }
        return years;
    };

    self.getTerms = function() {
        return ["Fall", "Winter", "Fall/Winter", "Spring"];
    };

    function resetValidation(form) {
        form.$setPristine();
        form.$setUntouched();
    }

    function updateMainRow() {
        if (isMain) {
            return;
        }
        else {
            mainService.getRow(mainRow)
                .then(function(res) {
                    _.merge(mainRow.entity, res.data[0]);
                }, function(err) {
                    toaster.error(err);
                });
        }
    }

    function handleRoleControl(formData, gridData) {
        // Toggle form buttons by user's role
        if (CurrentUser.getRole() === "reader") {
            self.readOnly = true;
            // Set all inputs as readonly
            _.forEach(formData.inputs, function(input) {
                if (input.type === "autocomplete") {
                    input.type = "text";
                    input.disabled = false; // autocomplete disabled uses a function, so set to false
                }
                input.readonly = true;
            });
        }
        else {
            self.readOnly = (gridData.readOnly) ? gridData.readOnly : false;
            // Modifiy form title when it's not readonly
            if (!self.readOnly) {
                formData.title = (formData.isEditing) ? "Edit " + formData.title : "Add " + formData.title;
            }
        }
    }
});