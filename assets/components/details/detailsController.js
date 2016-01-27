application.controller('detailsController', function($scope) {

}).config(function($mdThemingProvider) {
    
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();
});