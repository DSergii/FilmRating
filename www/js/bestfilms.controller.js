;(function() {
	'use strict'
	angular
		.module('FilmRating.bestfilms', [])
		.controller('bfCtrl', bfCtrl);
		
		
		function bfCtrl($scope, $http, $ionicPopup, localStorageService, $rootScope, $ionicLoading){
			var vm = this;
			vm.filmData = [];
			vm.counter = 0;
			var fav = localStorageService.get('favorite');
			if(!fav) {
				fav = {};
				localStorageService.set('favorite', fav);
			}else{
				fav = localStorageService.get('favorite');
			}
			var urlFilm = "http://www.myapifilms.com/imdb/top?format=JSON&start=1&end=20&data=F";
			
			vm.show = function() {
				$ionicLoading.show({
					template: 'Loading...'
				});
			};
			vm.hide = function(){
				$ionicLoading.hide();
			};
			vm.checkState = function(id){
				if(fav[id] != undefined)
					return true;
				return false;
			}

			vm.show();
			$http.get(urlFilm).then(function(response){
				vm.filmData = response.data;
				$rootScope.allFilms = response.data;
				vm.hide(vm.filmData);
			}, function(response){
				alert('Sorry, but server not available. Please try again later, or check your internet connection.');
			});
			vm.showAlert = function(id) {
				var alertPopup = $ionicPopup.alert({
					title: '<h2>Trailer</h2>',
					template: '<h4>Sorry, but this functional not working now.</h4>'
				});
			};
			
			vm.saveFilms = function(data, status){
				if(status){
					fav = localStorageService.get('favorite');
					fav[data['idIMDB']] = data;
					localStorageService.set('favorite', fav);
				}
				else{
					fav = localStorageService.get('favorite');
					delete fav[data['idIMDB']];
					localStorageService.set('favorite', fav);
				}
			}
		}
	
})();
