(function(){
	var app = angular.module('userRegistration', []);
	
	app.factory('indexDBservice', function($window, $q){
		var indexedDB = $window.indexedDB;
		var db=null;
		var dbName = "userData";
		var objName = "user";
		var version = 2;
		
		var open = function(){
			var deferred = $q.defer();		
			
			var request = indexedDB.open(dbName, version);
			
			request.onupgradeneeded = function(event) {
				db = event.target.result;
				if(db.objectStoreNames.contains(objName)) {
					db.deleteObjectStore(objName);
				}
				var store = db.createObjectStore(objName, {keyPath: "id"});
			}
			
			request.onsuccess = function(event) {
				db = event.target.result;
				deferred.resolve();
			}
			
			request.onerror = function(event) {
				deferred.reject();
			}
			
			return deferred.promise;
		}
		
		var getUserData = function(){
			var deferred = $q.defer();
			
			if(db === null){
				deferred.reject("IndexDB is not opened yet!");
			}else{
				var trans = db.transaction([objName], "readonly");
				var store = trans.objectStore(objName);
				var request = store.get(1);
				
				request.onsuccess = function(event){
					deferred.resolve(event.target.result);
				}
				
				request.onerror = function(event){
					deferred.reject("could not find user");
				}
				
			}
			
			return deferred.promise;
		}
		
		//Name, Lastname, Address, and Date of birth
		var putUserData = function(name,lastname,address,dateOfBirth){
			var deferred = $q.defer();
			
			if(db === null){
				deferred.reject("IndexDB is not opened yet!");
			}else{
				var trans = db.transaction([objName], "readwrite");
				var store = trans.objectStore(objName);
				
				var request = store.put({
					"id":1,
					"name":name,
					"lastname":lastname,
					"address":address,
					"dateOfBirth":$("#dateofbirth").val(),
					"creationDate":new Date()
				});
				
				request.onsuccess = function(event) {
					deferred.resolve();
				};
				
				request.onerror = function(event) {
					console.log(e.value);
					deferred.reject("an error accured while saving data");
				}
			}
			
			return deferred.promise;
		}
		
		var delUserData = function(){
			var deferred = $q.defer();
			
			if(db === null){
				deferred.reject("IndexDB is not opened yet!");
			}else{
				var trans = db.transaction([objName], "readwrite");
				var store = trans.objectStore(objName);
				
				var request = store.delete(1);
				
				request.onsuccess = function(event) {
					deferred.resolve();
				};
				
				request.onerror = function(event) {
					console.log(e.value);
					deferred.reject("an error accured while deleting data");
				}
			}
			
			return deferred.promise;
		}
		
		
		return {
		open: open,
		getUserData: getUserData,
		putUserData: putUserData,
		delUserData: delUserData
		};
		
	});
	//END app.factory



	app.controller('userRegisterController', function($scope,$window, indexDBservice) {
		var response; 
		var vm = this;
		
		function init(){
			console.log('init');
			var displayForm = 'none';
			
			$("#dateofbirth").datepicker({
				changeMonth: true,
				changeYear: true
			});
			
			indexDBservice.open().then( function(){
				indexDBservice.getUserData().then(function(data){
					response = data;
					console.log(response);
					
					$scope.displayForm = 'none';
					$scope.displayWelcome = 'none';
					$scope.bodyBGC='white';
					
					if(typeof data=='undefined'){
						$scope.displayForm = 'inline';
						$("#cont").show();
					}else{
						$scope.displayWelcome = 'inline';
						$scope.lastname=response["lastname"];
						$scope.name=response["name"];
						$("#cont").show();
						
						var dateParts = String(response["dateOfBirth"]).split('/');
						
						var age = moment().diff( dateParts[2]+'-'+dateParts[0]+'-'+dateParts[1], 'years');
						var weekDay = moment( dateParts[2]+''+dateParts[0]+''+dateParts[1] ).isoWeekday();
						
						if( weekDay == 5){
							console.log('friday');
							$scope.bodyBGC='green';
						}else{
							console.log('not friday');
						}
					}
				})
			});
			
			setInterval( function(){
				var valid = true;	
				$('form[name="registration"] input:text').each( function(){					
					switch( $(this).attr('name') ){
						case "name":
						case "lastname":
						case "address":
						valid = valid && ($(this).val()!='');
						break;
						case "dateofbirth":
						var v = vali_date( $(this).val() );
						valid = valid && v;						
						break;
					}
				});
				if(valid){
				$('form[name="registration"] input:submit').removeAttr('disabled');
				}else{
				$('form[name="registration"] input:submit').attr('disabled','disabled');
				}
			},200);

			
		}
		
		init();
		
		vm.register = function(){
			indexDBservice.putUserData(
				$scope.name,
				$scope.lastname,
				$scope.address,
				$scope.dateofbirth
				).then( function(){
				location.replace("index.html");
			});
		};
		
		vm.delete = function(){
			indexDBservice.delUserData().then( function(){
				location.replace("index.html");
			});
		};

	});
	//END app.controller

})();



function vali_date(date){	
	var pattern =/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
	$("#invalid_date").html('').hide();

	if( date!='' ){
		if( !pattern.test( date ) ){
		$("#invalid_date").html('Date of birth must be typed in mm/dd/yyyy format').show();
		return false;
		}else{
			var dateParts = String( date ).split('/');
			var age = moment().diff( dateParts[2]+'-'+dateParts[0]+'-'+dateParts[1], 'years');
			if( age >= 21){
			return true;
			}else{
			$("#invalid_date").html('To register you must be 21 years or older').show();
			return false;
			}		
		}
	}else{
	$("#invalid_date").html('Date of birth is required').show();
	return false;
	}
}