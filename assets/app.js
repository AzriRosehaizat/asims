var application = angular.module('application', ['lodash', 'ui.router', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection', 
'ngAnimate', 'ngMaterial', 'ngMessages', 'angularMoment', 'ngLoadingSpinner']);

application.config(function($stateProvider, $urlRouterProvider, AccessLevels) {
	$stateProvider
		.state('index', {
			url: '/index',
			views: {
				'': {
					templateUrl: '/views/index/index.html'
				},
				'loginModalButton@index': {
					templateUrl: '/components/loginButton/loginButton.html',
					controller: 'loginButtonController'
				}
			},
			data: {
				access: AccessLevels.guest
			}
		})
		.state('application', {
			abstract: true,
			views: {
				'': {
					templateUrl: '/views/application/application.html'
				},
				'navTopBar@application': {
					templateUrl: '/components/navTopBar/navTopBar.html',
					controller: 'navTopBarController'
				},
				'navLeftBar@application': {
					templateUrl: '/components/navLeftBar/navLeftBar.html',
					controller: 'navLeftBarController'
				}
			},
			resolve: {
				user: function(CurrentUser) {
					return CurrentUser.getUser();
				}
			},
			data: {
				access: AccessLevels.reader
			}
		})
		.state('application.root', {
			url: '/application'
		})
		.state('application.regularStaff', {
			url: '/regularStaff',
			views: {
				'': {
					templateUrl: '/components/content/content.html',
					controller: 'regularStaffController'
				},
				'grid@application.regularStaff': {
					templateUrl: '/components/grid/grid.html',
					controller: 'gridController'
				},
				'details@application.regularStaff': {
					templateUrl: '/components/content/regularStaff/details.html',
					controller: 'detailsController'
				},
				'tabset@application.regularStaff': {
					templateUrl: '/components/tabset/tabset.html',
					controller: 'tabsetController'
				}
			},
			resolve: {
				regularStaffs: function($http) {
					return $http.get('/regularStaff/');
				}
			}
		})
		.state('application.profile', {
			url: '/profile',
			views: {
				'': {
					templateUrl: '/components/profile/profile.html',
					controller: 'profileController'
				},
				'details@application.profile': {
					templateUrl: '/components/profile/details.html',
					controller: 'detailsController'
				}
			},
			resolve: {
				user: function(CurrentUser) {
					return CurrentUser.getUser();
				}
			}
		})
		.state('application.admin', {
			url: '/admin',
			views: {
				'': {
					templateUrl: '/components/admin/admin.html',
					controller: 'adminController'
				},
				'grid@application.admin': {
					templateUrl: '/components/grid/grid.html',
					controller: 'gridController'
				},
				'details@application.admin': {
					templateUrl: '/components/admin/details.html',
					controller: 'detailsController'
				}
			},
			resolve: {
				users: function($http) {
					return $http.get('/user/');
				}
			},
			data: {
				access: AccessLevels.admin
			}
		});

	$urlRouterProvider.otherwise(function($injector) {
		var $state = $injector.get('$state');
		$state.go('index');
	});
});

application.run(function($rootScope, $state, loginModalService, Auth) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

		var shouldLogin = (toState.data !== undefined) && (!Auth.authorize(toState.data.access));

		// NOT authenticated - wants any private stuff
		if (shouldLogin) {
			$state.go('index');
			event.preventDefault();
			loginModalService.open();
			return;
		}

		// authenticated (previously) comming to index
		if (Auth.isAuthenticated()) {
			var shouldGoToApp = (fromState.name === '') && (toState.name === 'index');

			if (shouldGoToApp) {
				$state.go('application.root');
				event.preventDefault();
				return;
			}
		}
	});
});