;(function() {
	'use strict'
	angular
		.module('FilmRating.statistics', ['chart.js'])
		.controller('statisticsCtrl', statisticsCtrl);
		
		function statisticsCtrl($scope, $http, $rootScope){
			
			var vm = this,
				labels = [],
				data = [],
				arr = [],
				tmp,
				obj = {};
			
			angular.forEach($rootScope.allFilms, function(value) {
				arr.push(value['year']);
			});
			arr.sort();
			for (var i = 0; i < arr.length; i++){
				tmp = arr[i].replace(/([0-9]{3})([0-9]{1})/, '$1');
				if(obj[tmp] == undefined) obj[tmp] = 1;
				else obj[tmp]++;
			};
			for (var key in obj) {
				labels.push(key+'0`s: ' + obj[key]+' film'+ (obj[key] > 1 ? 's' : ''));
				data.push(obj[key]);
			}
			
			vm.labels = labels;
			vm.data = data;
		}
})();
