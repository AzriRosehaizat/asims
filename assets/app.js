var application = angular.module('application', ['ui.router', 'ui.bootstrap', 'ui.grid', 'ngAnimate', 'xeditable']);

application.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

application.config(function($stateProvider, $urlRouterProvider, $locationProvider, AccessLevels) {
	$urlRouterProvider.otherwise('/index');
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
				access: AccessLevels.anon
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
				access: AccessLevels.user
			}
		})
		.state('application.root', {
			url: '/application'
		})
		.state('application.professor', {
			url: '/professor',
			views: {
				'': {
					templateUrl: '/components/content/content.html',
					controller: 'professorController'
				},
				'grid@application.professor': {
					templateUrl: '/components/grid/grid.html',
					controller: 'gridController'
				},
				'details@application.professor': {
					templateUrl: '/components/details/details.html',
					controller: 'detailsController'
				},
				'tabset@application.professor': {
					templateUrl: '/components/tabset/tabset.html',
					controller: 'tabsetController'
				}
			},
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
				}
			},
			data: {
				access: AccessLevels.user // should be admin
			}
		});

	// use the HTML5 History API
	//$locationProvider.html5Mode(true).hashPrefix('!')
});

application.run(function($rootScope, $state, loginModalService, Auth) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
		if (!Auth.authorize(toState.data.access)) {
			event.preventDefault();
			loginModalService.open().result
				.then(function(response) {
					$state.go(toState.name, toParams);
				})
				.catch(function(error) {
					$state.go('index');
				});
		}
	});
});