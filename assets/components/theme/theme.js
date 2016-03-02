application.config(function($mdThemingProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('grey')
        .warnPalette('red', {
            'hue-2': '900'
        })
        .accentPalette('blue-grey')
        .backgroundPalette('grey');

    $mdThemingProvider.theme('dark')
        .dark();
});