var application = angular.module('application', ['lodash', 'ui.router', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection', 'ui.grid.resizeColumns','ui.grid.exporter',
	'ngAnimate', 'ngMaterial', 'ngMessages', 'angularMoment', 'ngAria'
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
						controller: 'gridController'
					}
				},
				resolve: {
					users: function($http) {
						return $http.get('/user/');
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
						controller: 'gridController'
					},
					'tabset@application.regularStaff': {
						templateUrl: '/components/tabset/tabset.html',
						controller: 'tabsetController'
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
						controller: 'gridController'
					},
					'tabset@application.contractStaff': {
						templateUrl: '/components/tabset/tabset.html',
						controller: 'tabsetController'
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
						controller: 'gridController'
					},
					'tabset@application.department': {
						templateUrl: '/components/tabset/tabset.html',
						controller: 'tabsetController'
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
						controller: 'gridController'
					},
					'tabset@application.course': {
						templateUrl: '/components/tabset/tabset.html',
						controller: 'tabsetController'
					}
				},
				resolve: {
					courses: function($http) {
						return $http.get('/course');
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
						controller: 'gridController'
					},
					// This Page does not have Related tabs
					// 'tabset@application.rank': {
					// 	templateUrl: '/components/tabset/tabset.html',
					// 	controller: 'tabsetController'
					// }
				},
				resolve: {
					ranks: function($http) {
						return $http.get('/rank');
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
						controller: 'gridController'
					},
					'tabset@application.research': {
						templateUrl: '/components/tabset/tabset.html',
						controller: 'tabsetController'
					}
				},
				resolve: {
					researches: function($http) {
						return $http.get('/research');
					}
				},
				data: {
					dataPage: true
				}
			})			
			.state('application.sectionOffered', {
				url: '/sectionOffered',
				views: {
					'': {
						templateUrl: '/components/content/content.html',
						controller: 'sectionOfferedController'
					},
					'grid@application.sectionOffered': {
						templateUrl: '/components/grid/grid.html',
						controller: 'gridController'
					}
				},
				resolve: {
					sectionOffered: function($http) {
						return $http.get('Section_Offered/getSectionOffered');
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
						controller: 'gridController'
					},
				
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
						controller: 'gridController'
					},
					'tabset@application.faculty': {
						templateUrl: '/components/tabset/tabset.html',
						controller: 'tabsetController'
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
			.state('application.FLC', {
				url: '/facultyLoadChart',
				views: {
					'': {
						templateUrl: '/components/report/report.html',
						controller: 'reportController'
					},
				}
			})
			.state('application.LEC', {
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
	.config(function($provide) {
		$provide.decorator('GridOptions', function($delegate ,uiGridConstants) {
			var gridOptions;
			gridOptions = angular.copy($delegate);
			gridOptions.initialize = function(options) {
				var initOptions;
				initOptions = $delegate.initialize(options);
				//set global options
				//don't need header menus if we are using the speed dial
				initOptions.enableColumnMenus = false;
				initOptions.enableGridMenu = true;
				initOptions.enableColumnResizing = true;
				initOptions.noUnselect = true;
				initOptions.multiSelect = false;
				initOptions.enableRowHeaderSelection = false;
				initOptions.enableHorizontalScrollbar = 0;
				initOptions.exporterMenuPdf = false;
	        	initOptions.gridMenuCustomItems = [
		            {
		                title: 'Toggle Filters',
		                action: function ( $event ) {
		                    initOptions
		                    .enableFiltering = (
		                        !initOptions
		                        .enableFiltering
		                    );
		                    
		                    this
		                    .grid
		                    .api
		                    .core
		                    .notifyDataChange( 
		                        uiGridConstants
		                        .dataChange
		                        .COLUMN 
		                    );
		                },
		                order: 1
		            }
		        ];

				return initOptions;
			};
			return gridOptions;
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
