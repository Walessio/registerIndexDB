'use strict';

// Register `indexDB` component, along with its associated controller and template
angular.
	module('registerApp').
	factory('indexDBservice', function($window, $q){
		var indexedDB = $window.indexedDB;
		var db=null;
		var dbName = "userData";
		var objName = "user";
		var version = 1;
		
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
					"dateOfBirth":dateOfBirth,
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