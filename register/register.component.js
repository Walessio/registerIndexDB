'use strict';

// Register `register` component, along with its associated controller and template
angular.
	module('registerApp').	
	component('register', {
		templateUrl: 'register/register.template.html',
		
		controller: function registerController($scope, indexDBservice) {
			
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
		  
		  //vm.init= function(messages){
			vm.init= function(){  
			console.log('init');  
			//console.log( angular );
			//messages.push({'text': 'Register: App started!','type':'info'});
			
			indexDBservice.open().then( function(){
					console.log('indexDBservice: opened');
					
					indexDBservice.getUserData().then(function(data){
						var response = data;
						console.log(response);
						
						if(typeof data=='undefined'){
							console.log('indexDBservice has no data');
							$scope.$ctrl.hasData = false;
						}else{
							console.log('indexDBservice has data');
							$scope.$ctrl.hasData = true;
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
				$scope.name,
				$scope.lastname,
				$scope.address,
				$scope.dateofbirth
				).then( function(){
				//console.log('registered');
				vm.init();
			  });
		  }
		  
		  vm.onDelete = function(){
			indexDBservice.delUserData().then( function(){
				//$scope.$ctrl.hasData = false;
				vm.init();
			});
		  };
		  
		}
		
	});