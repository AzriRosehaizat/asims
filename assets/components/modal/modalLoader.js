application.factory('ModalLoader', function($uibModal) {
    return {
        delete: function(row, url) {
            return $uibModal.open({
                templateUrl: '/components/modal/deleteModal.html',
                controller: 'deleteModalController',
                resolve: {
                    row: function() {
                        return row;
                    },
                    url: function() {
                        return url;
                    }
                }
            });
        }
    };
});