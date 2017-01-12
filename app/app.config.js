'use strict';

angular.
	module('registerApp').
	config(['$locationProvider' ,'$routeProvider',
		function config($locationProvider, $routeProvider) {
			$locationProvider.hashPrefix('!');

			$routeProvider.
			when('/register', {
				template: '<register></register>'+
				'<indexdb></indexdb>'
			}).
			otherwise('/register');
		}
	]);