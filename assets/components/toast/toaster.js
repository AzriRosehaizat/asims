application.service('toaster', function($mdToast) {
    
    return {
        open: function(type, text) {
            $mdToast.show({
                controller: 'toastController',
                templateUrl: '/components/toast/toast.html',
                locals: {
                    type: type,
                    text: text
                },
                hideDelay: 5000,
            });
        },
        done: function(text) {
            this.open("done", text);
        },
        info: function(text) {
            this.open("info_outline", text);
        },
        error: function(err) {
            var text = err;

            if (err.raw && err.raw.sqlState === "23000") {
                text = "Foreign key conflicts!";
            }

            this.open("error_outline", text);
        }
    };
})