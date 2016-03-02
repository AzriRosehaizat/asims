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
        warning: function(text) {
            this.open("warning", text);
        },
        error: function(err) {
            var text = (err.message) ? (err.message) : "You cannot perform this operation at the moment";
            
            // var text;
            // if (err.message) {
            //     text = (err.message);
            // } else if (err.error) {
            //     text = (err.error);
            // } else {
            //     text = "Error occurred. Operation cannot be performed at the moment";
            // }

            this.open("error_outline", text);
        }
    };
})