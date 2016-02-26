application.service('toaster', function($mdToast) {

    return {
        open: function(text) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(text)
                .hideDelay(5000)
            );
        },
        error: function(err) {
            var text = err;
            
            if (err.raw && err.raw.sqlState === "23000") {
                text = "Foreign key conflicts!";
            }
            
            this.open(text);
        }
    };
})