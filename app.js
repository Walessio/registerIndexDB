var app = angular.module('redirect', []);
app.controller("redirectController", function($window) {
	function init(){
	console.log('init');
	$window.location.href = 'register/index.html';
	}
	init();
});