'use strict';

// Register `indexdb` component, along with its associated controller and template
angular.
	module('registerApp').
	component('indexdb', {
		//template:'<p>IndexDB is here*</p>',
		templateUrl: 'indexdb/indexdb.template.html',
		
		controller: function indexdbController($rootScope, $scope,$window, indexDBservice) {
			var response; 
			var vm = this;
			this.dbmessages = new Array();
			
			/*
			function init(dbmessages){
				console.log('indexDBservice: init called');
				
				dbmessages.push({'text':'indexDBservice init called','type':'info'});
				
				indexDBservice.open().then( function(){
					console.log('indexDBservice: opened');
					dbmessages.push({'text':'indexDBservice: opened','type':'success'});
					console.log( dbmessages );
					
					indexDBservice.getUserData().then(function(data){
						response = data;
						console.log(response);
						
						if(typeof data=='undefined'){
							dbmessages.push({'text':'indexDBservice: no userdata','type':'info'});
							$rootScope.$broadcast('indexDBHasData', 'false');
							//console.log($rootScope);
						}else{
							dbmessages.push({'text':'indexDBservice: else userdata','type':'info'});
							$rootScope.$broadcast('indexDBHasData', 'true');							
						}
						
					});
					
				});
			}
			*/

			//init(this.dbmessages);
		}
	});