application.service('formService', function($injector, $mdDialog, _, toaster) {

    this.formData = {};
    var service, row, gridData;

    this.setFormData = function(formData, serviceName) {
        this.formData = formData;
        service = $injector.get(serviceName);

        // temporary solution
        this.formData.tenureDate = (formData.model.tenureDate) ? new Date(formData.model.tenureDate) : null;
        this.formData.contAppDate = (formData.model.contAppDate) ? new Date(formData.model.contAppDate) : null;
    };

    this.setRow = function(currentRow) {
        row = currentRow;
    };

    this.setGridData = function(data) {
        gridData = data;
    };

    this.resetForm = function() {
        this.formData = {};
    };

    this.submit = function(formData) {
        if (formData.isEditing) {
            this.update(row, formData);
        }
        else {
            this.create(gridData, formData);
        }
    };

    this.update = function(row, formData) {
        formData.mode = 'indeterminate';

        service.update(formData)
            .then(function(res) {
                _.merge(row.entity, res.data);
                toaster.open("Updated successfully!");
            }, function(err) {
                toaster.open(err);
            })
            .finally(function(notice) {
                formData.mode = '';
            });
    };

    this.create = function(gridData, formData) {
        formData.mode = 'indeterminate';

        service.create(formData)
            .then(function(res) {
                gridData.push(res.data);
                formData.model = {};
                resetValidation(formData);
                toaster.open("Added successfully!");
            }, function(err) {
                toaster.open(err);
            })
            .finally(function(notice) {
                formData.mode = '';
            });
    };

    this.cancel = function(formData) {
        if (formData.isEditing) {
            _.merge(formData.model, row.entity);
        }
        else {
            formData.model = {};
        }
        resetValidation(formData);

        // More specific?
        if (service.cancel) service.cancel(formData);
    };

    this.delete = function(ev, formData) {
        var confirm = $mdDialog.confirm()
            .title('You are deleting a row')
            .textContent('Are you sure?')
            .targetEvent(ev)
            .ok('Delete')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            formData.mode = 'indeterminate';
            var gridData = row.grid.options.data;
            var index = gridData.indexOf(formData.model);

            service.delete(formData)
                .then(function(res) {
                    gridData.splice(index, 1);
                    service.initAddForm(formData);
                    resetValidation(formData);
                    toaster.open("Deleted successfully!");
                }, function(err) {
                    console.log(err);

                    toaster.open(err);
                })
                .finally(function(notice) {
                    formData.mode = '';
                });
        });
    };

    function resetValidation(formData) {
        formData.form.$setPristine();
        formData.form.$setUntouched();
    }
});