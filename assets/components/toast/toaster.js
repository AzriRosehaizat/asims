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
        loginError: function(err) {
            var text = (err.error) ? "Username or Password is Invalid" : "Error occurred. Operation cannot be performed at the moment";
            this.open("error_outline", text);
        },
        error: function(err) {
            console.log(err);
            var text;
            
            if (err.originalError && err.originalError.errno === 1451)
                text = "Row is referenced. Please delete related infomation first.";
            else if (err.reason)
                text = err.reason;
            else 
                text = "Error occurred. Operation cannot be performed at the moment.";
                
            this.open("error_outline", text);
        }
    };
})