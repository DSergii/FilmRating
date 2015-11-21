// Ionic Starter App

	angular
		.module('FilmRating', [
			'ionic',
			'chart.js',
			'FilmRating.favorite',
			'FilmRating.statistics',
			'FilmRating.bestfilms',
			'LocalStorageModule'
			])
		.run(function($ionicPlatform) {
			$ionicPlatform.ready(function() {
				if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
					cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
					cordova.plugins.Keyboard.disableScroll(true);
				}
				if (window.StatusBar) {
					// org.apache.cordova.statusbar required
					StatusBar.styleDefault();
				}
			});
		})
		.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
	
		$stateProvider
			.state('tab', {
				url: '/tab',
				abstract: true,
				templateUrl: 'templates/tabs.html'
			})
			.state('tab.bestfilms', {
				cache: false,
				url: '/bestfilms',
				views: {
					'bestfilms': {
						templateUrl: 'templates/toptwenty.html',
						controller: 'bfCtrl'
					}
				}
			})
			.state('tab.statistics', {
				url: '/statistics',
					views: {
					'statistics': {
						templateUrl: 'templates/statistics.html',
						controller: 'statisticsCtrl'
					}
				}
			})
			.state('tab.favorite', {
				cache: false,
				url: '/favorite',
				views: {
					'favorite': {
						templateUrl: 'templates/favorite.html',
						controller: 'favoriteCtrl'
					}
				}
			});
			$urlRouterProvider.otherwise('/tab/bestfilms');
			
			localStorageServiceProvider
				.setPrefix('favorite')
				.setStorageType('localStorage')
				.setNotify(true, true);

	});

