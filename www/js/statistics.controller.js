;(function() {
	'use strict'
	angular
		.module('FilmRating.statistics', ['chart.js'])
		.controller('statisticsCtrl', statisticsCtrl);
		
		
		function statisticsCtrl($scope, $http, $rootScope){
			
			var vm = this;
			vm.labels = [];
			vm.data = [];

			var data = $rootScope.allFilms;
			var arr = [];
			var tmp = 0;
			var arr2 = [];
			var count = 1;
			var obj = {};
			var tmp2 = 0;
			angular.forEach(data, function(value, key) {
				arr.push(value['year']);
			});
			arr.sort();
			for (var i = 0; i < arr.length; i++){
				tmp = arr[i].replace(/([0-9]{2})([0-9]{1})([0-9]{1})/, '$2');
				arr2.push(tmp);				if(obj[tmp] != 'undefined'){
					obj[tmp] = tmp;
					if(obj[tmp] == tmp){
						if(tmp2 == tmp){
							obj[tmp] = count++;
						}else{
							tmp2 = tmp;
							count = 1;
							obj[tmp] = count++;
						}
					}
				}
				
			};
			
			var eg = '';
			for (var key in obj) {
				eg = (obj[key] == 1 ? 'film' : 'films');
				if(key == 0)	vm.labels.push('2000`s: ' + obj[key]+' '+ eg);
				if(key == 1)	vm.labels.push('2010`s: ' + obj[key]+' '+ eg);
				if(key == 2)	vm.labels.push('2020`s: ' + obj[key]+' '+ eg);
				if(key == 3)	vm.labels.push('2030`s: ' + obj[key]+' '+ eg);
				if(key == 4)	vm.labels.push('1940`s: ' + obj[key]+' '+ eg);
				if(key == 5)	vm.labels.push('1950`s: ' + obj[key]+' '+ eg);
				if(key == 6)	vm.labels.push('1960`s: ' + obj[key]+' '+ eg);
				if(key == 7)	vm.labels.push('1970`s: ' + obj[key]+' '+ eg);
				if(key == 8)	vm.labels.push('1980`s: ' + obj[key]+' '+ eg);
				if(key == 9)	vm.labels.push('1990`s: ' + obj[key]+' '+ eg);
				vm.data.push(obj[key]);
			}
		}
})();
