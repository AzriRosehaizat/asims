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

    var lightGreyMap = $mdThemingProvider.extendPalette('grey', {
        '800': '#494949'
    });

    $mdThemingProvider.definePalette('lightGrey', lightGreyMap);

    $mdThemingProvider.theme('light-grey')
        .primaryPalette('lightGrey');
});