'use strict';

// Register `register` component, along with its associated controller and template
angular.
	module('registerApp').	
	component('register', {
		templateUrl: 'register/register.template.html',
		
		controller: function registerController($rootScope, $scope, indexDBservice) {
			
		  // this.messages = [
			// {
			  // text: 'just an info...',
			  // type: 'info'
			// },
			// {
			  // text: 'I did it!',
			  // type: 'success'
			// },
			// {
			  // text: 'I tried to warn you',
			  // type: 'warning'
			// },
			// {
			  // text: 'Houston we have a problem...',
			  // type: 'error'
			// }
		  // ];
		  this.messages = new Array();
		  var vm = this;
		  this.hasData = undefined;
		  
		  this.name = 'John';
		  this.lastname = 'Doe';
		  this.address = 'address';
		  this.dateofbirth = new Date(1980,0,2);
		  this.age = 0;
		  
		  this.minAge = 21;
		  //this.maxDate = moment().substract(21, 'years');
		  this.maxDate = moment();
		  
		  this.highlightedWeekDay = 5;	//friday
		  this.highlightColor='green';
		  
		  this.weekDayOfBirth = -1;
		  //this.weekDay
		  //$rootScope.backgroundColor='yellow';
		  
		  //vm.init= function(messages){
			vm.init= function(){  
			console.log('init');  
			//console.log( angular );
			//messages.push({'text': 'Register: App started!','type':'info'});
			//$scope.$ctrl.maxDate = new Date(1996,11,12);
			$scope.$ctrl.maxDate = moment().subtract($scope.$ctrl.minAge,'years').format('YYYY-MM-DD');
			
			indexDBservice.open().then( function(){
					console.log('indexDBservice: opened');
					
					indexDBservice.getUserData().then(function(data){
						var response = data;
						console.log(response);
						
						if(typeof data=='undefined'){
							console.log('indexDBservice has no data');
							$scope.$ctrl.hasData = false;
							//$scope.$ctrl.name = '';
							//$scope.$ctrl.lastname = '';
							//$scope.$ctrl.address = '';
							//$scope.$ctrl.dateofbirth = '';
							$rootScope.backgroundColor='';	
						}else{
							console.log('indexDBservice has data');
							$scope.$ctrl.hasData = true;
							$scope.$ctrl.name = response.name;
							$scope.$ctrl.lastname = response.lastname;
							$scope.$ctrl.dateofbirth = response.dateofbirth;
							//console.log( $scope.$ctrl.calculateAge($scope.$ctrl.dateofbirth) );
							//$scope.$ctrl.age = $scope.$ctrl.calculateAge($scope.$ctrl.dateofbirth);
							$scope.$ctrl.weekDayOfBirth = $scope.$ctrl.getWeekDay( $scope.$ctrl.dateofbirth );
							console.log( $scope.$ctrl.weekDayOfBirth );
							if( $scope.$ctrl.weekDayOfBirth == $scope.$ctrl.highlightedWeekDay ){
							$rootScope.backgroundColor=$scope.$ctrl.highlightColor;	
							}
							
						}
						console.log($scope.$ctrl);
					});
					
				});
			
		  }
		  
		  vm.init();
		  
		  /*
		  $scope.$on('indexDBHasData', function (event, arg) { 
			$scope.receiver = 'indexDBHasData: ' + arg;
			console.log($scope.receiver);
			if(arg=='false'){
				//show form
				//messages.push({'text': 'Register: indexDBHasData is false','type':'info'});
				//init(messages);
				$scope.hasData = false;
			}else{
				//show welcome
				//messages.push({'text': 'Register: indexDBHasData is true','type':'info'});
				//init(messages);
				$scope.hasData = true;
			}
		  });
		  */
		  
		  vm.onSubmit = function(){
			  console.log('onSubmit');
			  console.log($scope);
			  indexDBservice.putUserData(
				$scope.$ctrl.name,
				$scope.$ctrl.lastname,
				$scope.$ctrl.address,
				$scope.$ctrl.dateofbirth
				).then( function(){
				console.log('registered');
				vm.init();
			  });
		  }
		  
		  vm.onDelete = function(){
			indexDBservice.delUserData().then( function(){
				//$scope.$ctrl.hasData = false;
				vm.init();
			});
		  };
		  
		  vm.calculateAge = function calculateAge(momentObj) { // birthday is a date
				// var ageDifMs = Date.now() - birthday.getTime();
				// var ageDate = new Date(ageDifMs); // miliseconds from epoch
				// return Math.abs(ageDate.getUTCFullYear() - 1970);
				//console.log(momentObj);
				var age = moment().diff( momentObj, 'years');
				//console.log( age );
				return age;
			}
			
			vm.getWeekDay = function( momentObj ){
				return moment( momentObj ).isoWeekday();
			}
		  
		}
		
	});