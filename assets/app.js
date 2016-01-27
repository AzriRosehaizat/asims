var application = angular.module('application', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ui.grid', 'ui.grid.selection', 'ui.grid.infiniteScroll', 'schemaForm', 'passwordConfirm'/*, 'ngLoadingSpinner'*/]);

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
				'navigationBar@application': {
					templateUrl: '/components/navigationBar/navigationBar.html',
					controller: 'navigationBarController'
				}
			},
			data: {
				access: AccessLevels.reader
			}
		})
		.state('application.root', {
			url: '/application'
		})
		.state('application.academicStaff', {
			url: '/academicStaff',
			views: {
				'': {
					templateUrl: '/components/content/content.html',
					controller: 'academicStaffController'
				},
				'grid@application.academicStaff': {
					templateUrl: '/components/grid/grid.html',
					controller: 'gridController'
				},
				'details@application.academicStaff': {
					templateUrl: '/components/details/details.html',
					controller: 'detailsController'
				},
				'tabset@application.academicStaff': {
					templateUrl: '/components/tabset/tabset.html',
					controller: 'tabsetController'
				}
			},
			resolve: {
				academicStaffs: function($http) {
					return $http.get('/academicStaff/');
				}
			}
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
					templateUrl: '/components/details/details.html',
					controller: 'detailsController'
				},
				'tabset@application.regularStaff': {
					templateUrl: '/components/tabset/tabset.html',
					controller: 'tabsetController'
				}
			},
			resolve: {
				regularStaffs: function($http) {
					return $http.get('/RegularStaff/test?startID=0&limit=50');
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
					templateUrl: '/components/details/details.html',
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
					templateUrl: '/components/details/details.html',
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