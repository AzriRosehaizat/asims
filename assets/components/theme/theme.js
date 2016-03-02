application.config(function($mdThemingProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('grey')
        .warnPalette('red', {
            'hue-2': '900'
        })
        .accentPalette('indigo')
        .backgroundPalette('grey');

    $mdThemingProvider.theme('dark')
        .dark();
});