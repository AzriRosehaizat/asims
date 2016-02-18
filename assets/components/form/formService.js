application.service('formService', function() {
    
    
    this.formData = {};
    
    this.setFormData = function(formData) {
        this.formData = formData;
    };
    
    this.resetForm = function() {
        this.formData = {};
    };
});