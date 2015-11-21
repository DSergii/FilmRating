;(function() {
	'use strict'
	angular
		.module('FilmRating.favorite', [])
		.controller('favoriteCtrl', favoriteCtrl);
		
		
		function favoriteCtrl($scope, localStorageService, $ionicPopup){
			var vm = this;
			var fav = localStorageService.get('favorite');
			if(!fav) {
				fav = {};
				localStorageService.set('favorite', fav);
			}
			
			vm.data = fav;
			
			vm.removeFilms = function(id){
				delete fav[id];
				localStorageService.set('favorite', fav);
				vm.data = fav;
			}
			
			vm.showAlert = function(id) {
				var alertPopup = $ionicPopup.alert({
					title: '<h2>Trailer</h2>',
					template: '<h4>Sorry, but this functional not working now.</h4>'
				});
			};
		}
		
})();
