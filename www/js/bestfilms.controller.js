;(function() {
	'use strict'
	angular
		.module('FilmRating.bestfilms', [])
		.controller('bfCtrl', bfCtrl);
		
		
		function bfCtrl($scope, $http, $ionicPopup, localStorageService, $rootScope, $ionicLoading){
			var vm = this;
			var fav = localStorageService.get('favorite');
			var urlFilm = "http://www.myapifilms.com/imdb/top?format=JSON&start=1&end=20&data=F";
			
			vm.filmData = [];
			
			if(!fav) {
				fav = {};
				localStorageService.set('favorite', fav);
			}
			if(!localStorageService.get('top')) localStorageService.set('top', {});
			
			vm.show = function() {
				$ionicLoading.show({
					template: 'Loading...'
				});
			};
			vm.hide = function(){
				$ionicLoading.hide();
			};
			vm.checkState = function(id){
				return fav[id] != undefined;
			}
			vm.showAlert = function(id) {
				$ionicPopup.alert({
					title: '<h2>Trailer</h2>',
					template: '<h4>Sorry, but this functional not working now.</h4>'
				});
			};
			
			vm.saveFilms = function(data, status){
				fav = localStorageService.get('favorite');
				
				if(status) fav[data['idIMDB']] = data;
				else delete fav[data['idIMDB']];
				
				localStorageService.set('favorite', fav);
			}
			if(!$rootScope.load || $rootScope.load > 10){
				vm.show();
				$rootScope.load = 1;
				$http.get(urlFilm).then(function(response){
					localStorageService.set('top', response.data);
					vm.filmData = $rootScope.allFilms = response.data;
					vm.hide();
				}, function(response){
					delete $rootScope.load;
					vm.filmData = $rootScope.allFilms = localStorageService.get('top');
					vm.hide();
					alert('Sorry, but server not available. Please try again later, or check your internet connection.');
				});
			}
			else{
				vm.filmData = $rootScope.allFilms = localStorageService.get('top');
				$rootScope.load++;
			}
			
		}
	
})();
