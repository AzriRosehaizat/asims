var application = angular.module("application", ["ui.router", "ui.bootstrap", "ngAnimate", "ui.grid", "ui.grid.selection", "ui.grid.expandable", "schemaForm"]);

application.config(function($stateProvider, $urlRouterProvider, AccessLevels) {
	$stateProvider
		.state("index", {
			url: "/index",
			views: {
				"": {
					templateUrl: "/views/index/index.html"
				},
				"loginModalButton@index": {
					templateUrl: "/components/loginButton/loginButton.html",
					controller: "loginButtonController"
				}
			},
			data: {
				access: AccessLevels.guest
			}
		})
		.state("application", {
			abstract: true,
			views: {
				"": {
					templateUrl: "/views/application/application.html"
				},
				"navigationBar@application": {
					templateUrl: "/components/navigationBar/navigationBar.html",
					controller: "navigationBarController"
				}
			},
			data: {
				access: AccessLevels.reader
			}
		})
		.state("application.root", {
			url: "/application"
		})
		.state("application.professor", {
			url: "/professor",
			views: {
				"": {
					templateUrl: "/components/content/content.html",
					controller: "professorController"
				},
				"grid@application.professor": {
					templateUrl: "/components/grid/grid.html",
					controller: "gridController"
				},
				"details@application.professor": {
					templateUrl: "/components/details/details.html",
					controller: "detailsController"
				},
				"tabset@application.professor": {
					templateUrl: "/components/tabset/tabset.html",
					controller: "tabsetController"
				}
			},
		})
		.state("application.profile", {
			url: "/profile",
			views: {
				"": {
					templateUrl: "/components/profile/profile.html",
					controller: "profileController"
				},
				// "details@application.profile": {
				// 	templateUrl: "/components/details/details.html",
				// 	controller: "detailsController"
				// }
			},
		})
		.state("application.admin", {
			url: "/admin",
			views: {
				"": {
					templateUrl: "/components/admin/admin.html",
					controller: "adminController"
				},
				"grid@application.admin": {
					templateUrl: "/components/grid/grid.html",
					controller: "gridController"
				}
			},
			data: {
				access: AccessLevels.admin
			}
		});

	$urlRouterProvider.otherwise("/index");
});

application.run(function($rootScope, $state, loginModalService, Auth) {
	$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState) {

		var shouldLogin = (toState.data !== undefined) && (fromState.name !== "index") && (!Auth.authorize(toState.data.access));

		// NOT authenticated - wants any private stuff
		if (shouldLogin) {
			$state.go("index");
			event.preventDefault();
			loginModalService.open();
			return;
		}

		// authenticated (previously) comming not to application.root
		if (Auth.isAuthenticated()) {
			var shouldGoToApp = (fromState.name === "index") && (toState.name !== "application.root");

			if (shouldGoToApp) {
				$state.go("application.root");
				event.preventDefault();
			}
			return;
		}

		// NOT authenticated (previously) comming not to index
		var shouldGoToIndex = (fromState.name === "index");

		if (shouldGoToIndex) {
			$state.go("index");
			console.log('p');
			event.preventDefault();
		}

		// if (!Auth.authorize(toState.data.access)) {
		// 	event.preventDefault();
		// 	loginModalService.open().result
		// 		.then(function(res) {
		// 			$state.go(toState.name, toParams);
		// 		}, function(err) {
		// 			console.warn(err);
		// 			$state.go("index");
		// 		});
		// }
	});
});