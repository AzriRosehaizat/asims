application.service('formService', function($injector, $mdDialog, _, toaster) {

    this.formData = {};
    var service;
    var row;

    this.setFormData = function(formData, serviceName, currentRow) {
        this.formData = formData;
        service = $injector.get(serviceName);
        row = currentRow;
    };

    this.resetForm = function() {
        this.formData = {};
    };

    this.submit = function(formData) {
        service.submit(formData);
    };

    this.cancel = function(formData) {
        if (formData.isEditing) {
            _.merge(formData.model, row.entity);
        }
        else {
            formData.model = {};
        }
        resetValidation(formData);
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