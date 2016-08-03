var application = angular.module('application', 
['lodash', 'ui.router', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection', 'ui.grid.saveState', 'ui.grid.autoResize', 'ui.grid.moveColumns',
	'ui.grid.resizeColumns', 'ui.grid.exporter', 'ngAnimate', 'ngMaterial', 'ngMessages', 'angularMoment', 'ngAria'
]);

application.config(function($stateProvider, $urlRouterProvider, AccessLevels) {
		$stateProvider
			.state('index', {
				url: '/index',
				views: {
					'': {
						templateUrl: '/views/index/index.html'
					},
					'login@index': {
						templateUrl: '/components/login/login.html',
						controller: 'loginController'
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
					},
					'navRightBar@application': {
						templateUrl: '/components/navRightBar/navRightBar.html',
						controller: 'navRightBarController'
					}
				},
				resolve: {
					user: function(CurrentUser) {
						return CurrentUser.getUser();
					}
				},
				data: {
					access: AccessLevels.reader,
					dataPage: false
				}
			})
			.state('application.root', {
				url: '/application',
				views: {
					'': {
						templateUrl: '/views/application/root.html'
					},
					'homeHeader@application': {
						templateUrl: '/components/homeHeader/homeHeader.html',
						controller: 'homeHeaderController'
					},
					'counter@application.root': {
						templateUrl: '/components/counter/counter.html',
						controller: 'counterController as ctrl'
					},
					'toDoList@application.root': {
						templateUrl: '/components/toDoList/toDoList.html',
						controller: 'toDoListController'
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
						controller: 'gridController as ctrl'
					}
				},
				resolve: {
					users: function($http, _, adminService) {
						return $http.get('/user/').then(function(res) {
							res.data = adminService.getLastLogin(res.data);
							return res;
						});
					}
				},
				data: {
					access: AccessLevels.admin,
					dataPage: true
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
						controller: 'gridController as ctrl'
					},
					'tabset@application.regularStaff': {
						templateUrl: '/components/tabset/tabset.html',
						controller: 'tabsetController as ctrl'
					}
				},
				resolve: {
					staffs: function($http) {
						return $http.get('/regularStaff/getAllRegularStaff');
					}
				},
				data: {
					dataPage: true
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
						controller: 'gridController as ctrl'
					},
					'tabset@application.contractStaff': {
						templateUrl: '/components/tabset/tabset.html',
						controller: 'tabsetController as ctrl'
					}
				},
				resolve: {
					staffs: function($http) {
						return $http.get('/contractStaff/getAllContractStaff');
					}
				},
				data: {
					dataPage: true
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
						controller: 'gridController as ctrl'
					},
					'tabset@application.department': {
						templateUrl: '/components/tabset/tabset.html',
						controller: 'tabsetController as ctrl'
					}
				},
				resolve: {
					departments: function($http) {
						return $http.get('/Department/getAllDepartment');
					}
				},
				data: {
					dataPage: true
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
						controller: 'gridController as ctrl'
					},
					'tabset@application.course': {
						templateUrl: '/components/tabset/tabset.html',
						controller: 'tabsetController as ctrl'
					}
				},
				resolve: {
					courses: function($http) {
						return $http.get('/course/getAllCourse');
					}
				},
				data: {
					dataPage: true
				}
			})
			.state('application.rank', {
				url: '/rank',
				views: {
					'': {
						templateUrl: '/components/content/content.html',
						controller: 'rankController'
					},
					'grid@application.rank': {
						templateUrl: '/components/grid/grid.html',
						controller: 'gridController as ctrl'
					}
				},
				resolve: {
					ranks: function($http) {
						return $http.get('/rank?populate');
					}
				},
				data: {
					dataPage: true
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
						controller: 'gridController as ctrl'
					},
					'tabset@application.research': {
						templateUrl: '/components/tabset/tabset.html',
						controller: 'tabsetController as ctrl'
					}
				},
				resolve: {
					researches: function($http) {
						return $http.get('/research?populate');
					}
				},
				data: {
					dataPage: true
				}
			})
			.state('application.section', {
				url: '/section',
				views: {
					'': {
						templateUrl: '/components/content/content.html',
						controller: 'sectionController'
					},
					'grid@application.section': {
						templateUrl: '/components/grid/grid.html',
						controller: 'gridController as ctrl'
					}
				},
				resolve: {
					section: function($http) {
						return $http.get('/Section?populate');
					}
				},
				data: {
					dataPage: true
				}
			})
			.state('application.faculty', {
				url: '/faculty',
				views: {
					'': {
						templateUrl: '/components/content/content.html',
						controller: 'facultyController'
					},
					'grid@application.faculty': {
						templateUrl: '/components/grid/grid.html',
						controller: 'gridController as ctrl'
					},
					'tabset@application.faculty': {
						templateUrl: '/components/tabset/tabset.html',
						controller: 'tabsetController as ctrl'
					}
				},
				resolve: {
					faculty: function($http) {
						return $http.get('/Faculty?populate');
					}
				},
				data: {
					dataPage: true
				}
			})
			.state('application.leaves', {
				url: '/leaves',
				views: {
					'': {
						templateUrl: '/components/content/content.html',
						controller: 'leaveController'
					},
					'grid@application.leaves': {
						templateUrl: '/components/grid/grid.html',
						controller: 'gridController as ctrl'
					},
					'tabset@application.leaves': {
						templateUrl: '/components/tabset/tabset.html',
						controller: 'tabsetController as ctrl'
					}
				},
				resolve: {
					staff: function($http) {
						return $http.get('/regularStaff/getAllRegularStaff');
					}
				},
				data: {
					dataPage: true
				}
			})
			.state('application.teachingActivityRAS', {
				url: '/teachingActivityRAS',
				views: {
					'': {
						templateUrl: '/components/content/content.html',
						controller: 'taRASController'
					},
					'grid@application.teachingActivityRAS': {
						templateUrl: '/components/grid/grid.html',
						controller: 'gridController as ctrl'
					},
					'tabset@application.teachingActivityRAS': {
						templateUrl: '/components/tabset/tabset.html',
						controller: 'tabsetController as ctrl'
					}
				},
				resolve: {
					staffs: function($http) {
						return $http.get('/regularStaff/getAllRegularStaff');
					}
				},
				data: {
					dataPage: true
				}
			})
			.state('application.teachingActivityCAS', {
				url: '/teachingActivityCAS',
				views: {
					'': {
						templateUrl: '/components/content/content.html',
						controller: 'taCASController'
					},
					'grid@application.teachingActivityCAS': {
						templateUrl: '/components/grid/grid.html',
						controller: 'gridController as ctrl'
					},
					'tabset@application.teachingActivityCAS': {
						templateUrl: '/components/tabset/tabset.html',
						controller: 'tabsetController as ctrl'
					}
				},
				resolve: {
					staffs: function($http) {
						return $http.get('/contractStaff/getAllContractStaff');
					}
				},
				data: {
					dataPage: true
				}
			})
			.state('application.403', {
				url: '/Forbidden',
				templateUrl: '/views/error/403.html',
				data: {
					access: AccessLevels.guest
				}
			})
			.state('application.404', {
				url: '/NotFound',
				templateUrl: '/views/error/404.html',
				data: {
					access: AccessLevels.guest
				}
			});

		$urlRouterProvider.otherwise(function($injector) {
			var $state = $injector.get('$state');
			$state.go('index');
		});
	})
	.run(function($rootScope, $state, $window, Auth, formService, SearchHelper, gridService) {
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

			formService.reset();
			SearchHelper.reset();
			gridService.saveAndReset();

			Auth.authorize(toState.data.access).then(function(access) {
				var shouldLogin = (toState.data) && (!access);

				// NOT authenticated - wants any private stuff
				if (shouldLogin) {
					$state.go('application.403');
					event.preventDefault();
					return;
				}

				// authenticated (previously) comming to index
				if (Auth.isAuthenticated()) {

					//if user is authenticated and redirected to login page, go to main page
					if (toState.name === 'index') {
						$state.go('application.root');
						event.preventDefault();
						return;
					}
				}
			});
		});
		// Handle the exit event
		$window.onbeforeunload = function() {
			gridService.saveAndReset();
		};
	});
