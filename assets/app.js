var application = angular.module('application', ['lodash', 'ui.router', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection',
	'ngAnimate', 'ngMaterial', 'ngMessages', 'angularMoment', 'ngAria'
]);

application.
config(function($stateProvider, $urlRouterProvider, AccessLevels) {
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
					controller: 'navLeftBarController as vm'
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
			url: '/application',
			views: {
				'' :{
					templateUrl: '/views/application/root.html'
				},
				'toDoList@application.root' :{
					templateUrl: '/components/toDoList/toDoList.html',
					controller: 'toDoListController'
				}
			},
			resolve: {
				user: function(CurrentUser) {
					return CurrentUser.getUser();
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
					templateUrl: '/components/profile/details.html'
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
				'navRightBar@application': {
					templateUrl: '/components/navRightBar/navRightBar.html',
					controller: 'navRightBarController'
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
				'tabset@application.regularStaff': {
					templateUrl: '/components/tabset/tabset.html',
					controller: 'tabsetController'
				},
				'navRightBar@application': {
					templateUrl: '/components/navRightBar/navRightBar.html',
					controller: 'navRightBarController'
				}
			},
			resolve: {
				staffs: function($http) {
					return $http.get('/regularStaff/getAllRegularStaff');
				}
			}
		})
		.state('application.contractStaff', {
			url: '/contractStaff',
			views: {
				'': {
					templateUrl: '/components/content/content.html',
					controller: 'contractStaffController'
				},
				'grid@application.contractStaff': {
					templateUrl: '/components/grid/grid.html',
					controller: 'gridController'
				},
				'tabset@application.contractStaff': {
					templateUrl: '/components/tabset/tabset.html',
					controller: 'tabsetController'
				},
				'navRightBar@application': {
					templateUrl: '/components/navRightBar/navRightBar.html',
					controller: 'navRightBarController'
				}
			},
			resolve: {
				staffs: function($http) {
					return $http.get('/contractStaff');
				}
			}
		})
		.state('application.department', {
			url: '/department',
			views: {
				'': {
					templateUrl: '/components/content/content.html',
					controller: 'departmentController'
				},
				'grid@application.department': {
					templateUrl: '/components/grid/grid.html',
					controller: 'gridController'
				},
				'tabset@application.department': {
					templateUrl: '/components/tabset/tabset.html',
					controller: 'tabsetController'
				},
				'navRightBar@application': {
					templateUrl: '/components/navRightBar/navRightBar.html',
					controller: 'navRightBarController'
				}
			},
			resolve: {
				departments: function($http) {
					return $http.get('/department');
				}
			}
		})
		.state('application.course', {
			url: '/course',
			views: {
				'': {
					templateUrl: '/components/content/content.html',
					controller: 'courseController'
				},
				'grid@application.course': {
					templateUrl: '/components/grid/grid.html',
					controller: 'gridController'
				},
				'tabset@application.course': {
					templateUrl: '/components/tabset/tabset.html',
					controller: 'tabsetController'
				},
				'navRightBar@application': {
					templateUrl: '/components/navRightBar/navRightBar.html',
					controller: 'navRightBarController'
				}
			},
			resolve: {
				courses: function($http) {
					return $http.get('/course');
				}
			}
		})
		.state('application.research', {
			url: '/research',
			views: {
				'': {
					templateUrl: '/components/content/content.html',
					controller: 'researchController'
				},
				'grid@application.research': {
					templateUrl: '/components/grid/grid.html',
					controller: 'gridController'
				},
				'tabset@application.research': {
					templateUrl: '/components/tabset/tabset.html',
					controller: 'tabsetController'
				},
				'navRightBar@application': {
					templateUrl: '/components/navRightBar/navRightBar.html',
					controller: 'navRightBarController'
				}
			},
			resolve: {
				researches: function($http) {
					return $http.get('/research');
				}
			}
		})
		.state('application.FLC', {
			url: '/facultyLoadChart',
			views: {
				'': {
					templateUrl: '/components/report/report.html',
					controller: 'reportController'
				},
				"chart@application.FLC": {
					templateUrl: '/components/report/loadChart/loadChart.html',
					controller: 'loadChartController'
				}
			},
		})
		.state('application.LEC',{
			url: '/leaveEntitlementChart',
			views: {
				'': {
					templateUrl: '/components/report/report.html',
					controller: 'reportController'
				},
				"chart@application.LEC": {
				templateUrl: '/components/report/leaveChart/leaveChart.html',
				controller: 'leaveChartController'
				}
			},
		});

	$urlRouterProvider.otherwise(function($injector) {
		var $state = $injector.get('$state');
		$state.go('index');
	});
})

.run(function($rootScope, $state, loginModalService, Auth, formService, SearchHelper) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
		
		formService.reset();
		SearchHelper.reset();

		Auth.authorize(toState.data.access).then(function(access) {
			var shouldLogin = (toState.data) && (!access);

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
});