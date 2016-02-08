application.service('toaster', function($mdToast) {

    return {
        open: function(text) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(text)
                .hideDelay(1000)
            );
        }
    };
})