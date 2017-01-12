describe('register', function() {

	// Load the module that contains the `register` component before each test
	beforeEach(module('registerApp'));
	
	// Test the controller	
	describe('registerController', function() {
		var $rootScope,$scope,ctrl
		
		it('should check if minAge is 21', inject(function($componentController) {
			$scope = {};
			ctrl = $componentController('register', { $scope: $scope });
			
			expect(ctrl.minAge).toBe(21);			
		}));
		
		it('should check if highlightedWeekDay is 5', inject(function($componentController) {
			$scope = {};
			ctrl = $componentController('register', { $scope: $scope });
			
			expect(ctrl.highlightedWeekDay).toBe(5);
		}));
		
		it('should check if highlightColor is green', inject(function($componentController) {
			$scope = {};
			ctrl = $componentController('register', { $scope: $scope });
			
			expect(ctrl.highlightColor).toBe('green');
		}));
		
		it('should check if the init method has been called', inject(function($componentController) {
			$scope = {};
			ctrl = $componentController('register', { $scope: $scope });

			expect($scope.inited).toBe(true);			
		}));
		
	});
	
});