application.factory('ModalLoader', function($uibModal) {
    return {
        delete: function(row, url, id) {
            return $uibModal.open({
                templateUrl: '/components/modal/deleteModal.html',
                controller: 'deleteModalController',
                resolve: {
                    row: function() {
                        return row;
                    },
                    url: function() {
                        return url;
                    },
                    id: function() {
                        return id;
                    }
                }
            });
        }
    };
});