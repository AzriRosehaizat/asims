application.config(function($mdThemingProvider) {
    
    var lightGreyMap = $mdThemingProvider.extendPalette('grey', {
        '800': '#494949'
    });
    
    $mdThemingProvider.definePalette('lightGrey', lightGreyMap);

    $mdThemingProvider.theme('light-grey')
        .primaryPalette('lightGrey');

    $mdThemingProvider.theme('dark')
        .dark();
});