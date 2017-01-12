'use strict';

// Register `register` component, along with its associated controller and template
angular.
	module('registerApp').	
	component('register', {
		templateUrl: 'register/register.template.html',		
		controller: function registerController($rootScope, $scope, indexDBservice) {

			//minimal acceptable age
			this.minAge = 21;
			//day of the week wich changes body background-color: 5 = friday
			this.highlightedWeekDay = 5;	
			//background-color to use for the highlightedWeekDay
			this.highlightColor='green';
			//if true, it shows the delete button to delete registered data
			this.isDeletable = true;
			
			this.maxDate = new Date( moment().subtract(this.minAge,'years').format('YYYY-MM-DD') );
			$scope.hasData = undefined;

			$scope.name = '';
			$scope.lastname = '';
			$scope.address = '';
			$scope.dateofbirth = '';

			//computed age and weekDayOfBirth according to registered dateofbirth
			$scope.age = 0;
			
			$scope.weekDayOfBirth = -1;
			
			$scope.inited = false;
			
			var vm = this;

			vm.init= function(){  
				$scope.inited = true;
				
				$scope.name='';
				$scope.lastname='';
				$scope.address='';
				$scope.dateofbirth='';
				
				indexDBservice.open().then( function(){						
					indexDBservice.getUserData().then(function(data){
						if(typeof data=='undefined'){
							$scope.$ctrl.hasData = false;
							
							$scope.$ctrl.name='';
							$scope.$ctrl.lastname='';
							$scope.$ctrl.address='';
							$scope.$ctrl.dateofbirth='';
				
							$rootScope.backgroundColor='';	
						}else{
							$scope.$ctrl.hasData = true;
							
							$scope.$ctrl.name = data.name;
							$scope.$ctrl.lastname = data.lastname;
							$scope.$ctrl.dateofbirth = data.dateofbirth;
							$scope.$ctrl.weekDayOfBirth = $scope.$ctrl.getWeekDay( $scope.$ctrl.dateofbirth );
								
								if( $scope.weekDayOfBirth == $scope.$ctrl.highlightedWeekDay ){
								$rootScope.backgroundColor=$scope.$ctrl.highlightColor;	
								}
						}
					});
				});
			}

			vm.init();

			vm.onSubmit = function(){
				indexDBservice.putUserData(
					$scope.$ctrl.name,
					$scope.$ctrl.lastname,
					$scope.$ctrl.address,
					$scope.$ctrl.dateofbirth
				).then( function(){
					vm.init();
				});
			}

			vm.onDelete = function(){
				indexDBservice.delUserData().then( function(){
					vm.init();
				});
			};

			vm.getWeekDay = function( momentObj ){
				return moment( momentObj ).isoWeekday();
			}

		}
		
	});