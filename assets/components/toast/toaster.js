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
            //very hacky and unhandled. ToDO: render a specific error for this, by handling it on sails using lifecycle callbacks afterDelete()
            if (err.raw && err.raw.sqlState === "23000") {
                text = "Foreign key conflicts!";
            }
            else {
                text = (err.message) ? (err.message) : "You cannot perform this operation at the moment";
            }
            this.open(text);
        }
    };
})